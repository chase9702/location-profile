package com.carrotins.backend.service.location

import com.carrotins.backend.repository.location.*
import com.carrotins.backend.utils.transformCellToBoundary
import org.springframework.stereotype.Service


@Service
class LocationProfileDestinationService(
    private val locationDestinationRepository: LocationDestinationRepository
) {
    fun getDestinationPersonalData(
        memberId: Int?,
        plyNo: String?,
        dvcId: String?,
        month: String?,
        startDate: String?,
        endDate: String?
    ): List<Any> {

        val queryParams = listOfNotNull(
            memberId?.takeUnless { false }?.let { "member_id=$it" },
            plyNo?.takeUnless { false }?.let { "plyno='$it'" },
            dvcId?.takeUnless { false }?.let { "dvc_id='$it'" },
            month.takeUnless { it == null }?.let { "part_mm='$it'" },
            startDate.takeUnless { it == null }?.let { "part_dt>='$it'" },
            endDate.takeUnless { it == null }?.let { "part_dt<='$it'" }
        ).joinToString(" and ")

        val paramsCheck: Boolean = queryParams.contains("part_mm")

        if (paramsCheck) {
            val personalMonthlyData = locationDestinationRepository.getDestinationPersonalMonthlyData(queryParams)

            val personalMonthlyH3Data = personalMonthlyData.map {
                DestinationPersonalMonthlyAddH3Data(
                    memberId = it.memberId,
                    endH3 = it.endH3,
                    address = it.address,
                    h3cell = transformCellToBoundary(it.endH3),
                    count = it.count,
                    rank = it.rank
                )
            }

            return personalMonthlyH3Data
        } else {
            val personalPeriodData = locationDestinationRepository.getDestinationPersonalPeriodData(queryParams)

            val personalGroupedData = personalPeriodData.groupBy {
                DestinationPersonalPeriodAddH3Data(
                    it.memberId,
                    it.plyno,
                    it.dvcId,
                    it.endH3,
                    0,
                    0,
                    transformCellToBoundary(it.endH3),
                    it.address
                )
            }
            val personalCountPerGroup = personalGroupedData.mapValues { it.value.size }
            val personalPeriodH3Data = personalCountPerGroup
                .toList()
                .sortedByDescending { it.second }
                .fold(mutableListOf<DestinationPersonalPeriodAddH3Data>()) { acc, (group, count) ->
                    val lastRank = acc.lastOrNull()?.rank ?: 0
                    val rank = if (count == acc.lastOrNull()?.count) lastRank else lastRank + 1
                    acc.add(
                        DestinationPersonalPeriodAddH3Data(
                            group.memberId,
                            group.plyno,
                            group.dvcId,
                            group.endH3,
                            count,
                            rank,
                            transformCellToBoundary(group.endH3),
                            group.address
                        )
                    )
                    acc
                }
            return personalPeriodH3Data
        }
    }
}
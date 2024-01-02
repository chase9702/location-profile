package com.carrotins.backend.service.location

import com.carrotins.backend.repository.location.DestinationPersonalAddH3Data
import com.carrotins.backend.repository.location.DestinationPersonalData
import com.carrotins.backend.repository.location.LocationDestinationRepository
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
    ): List<DestinationPersonalAddH3Data> {

        val queryParams = listOfNotNull(
            memberId?.takeUnless { false }?.let { "member_id=$it" },
            plyNo?.takeUnless { false }?.let { "plyno='$it'" },
            dvcId?.takeUnless { false }?.let { "dvc_id='$it'" },
            month.takeUnless { it == null }?.let { "part_mm='$it'" },
            startDate.takeUnless { it == null }?.let { "part_dt>='$it'" },
            endDate.takeUnless { it == null }?.let { "part_dt<='$it'" }
        ).joinToString(" and ")

        val paramsCheck: Boolean = queryParams.contains("part_mm")

        val personalDataList: List<DestinationPersonalData> = if (paramsCheck) {
            println("세그먼트 조회")
            locationDestinationRepository.getDestinationSegmentData(queryParams)
        } else {
            println("개인 조회")
            locationDestinationRepository.getDestinationPersonalData(queryParams)
        }

        val personalGroupedData = personalDataList.groupBy {
            DestinationPersonalAddH3Data(
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
        val destinationPersonalRankData = personalCountPerGroup
            .toList()
            .sortedByDescending { it.second }
            .fold(mutableListOf<DestinationPersonalAddH3Data>()) { acc, (group, count) ->
                val lastRank = acc.lastOrNull()?.rank ?: 0
                val rank = if (count == acc.lastOrNull()?.count) lastRank else lastRank + 1
                acc.add(
                    DestinationPersonalAddH3Data(
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
        println(destinationPersonalRankData)
        return destinationPersonalRankData
    }
}
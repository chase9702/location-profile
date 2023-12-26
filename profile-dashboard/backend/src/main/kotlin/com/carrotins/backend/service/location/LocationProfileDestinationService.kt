package com.carrotins.backend.service.location

import com.carrotins.backend.repository.location.DestinationPersonalAddH3Data
import com.carrotins.backend.repository.location.DestinationPersonalData
import com.carrotins.backend.repository.location.LocationDestinationRepository
import com.carrotins.backend.utils.transformCellToBoundary
import com.uber.h3core.H3Core
import org.springframework.stereotype.Service


@Service
class LocationProfileDestinationService (
    private val locationDestinationRepository: LocationDestinationRepository
){
    fun getDestinationPersonalData(
        memberId: String?,
        plyNo: String?,
        dvcId: String?,
        month: String,
        startDate: String,
        endDate: String
    ): List<DestinationPersonalAddH3Data>{

        val queryParams = listOfNotNull(
            memberId?.takeUnless { it == "null" }?.let { "member_id='$it'" },
            plyNo?.takeUnless { it == "null" }?.let { "plyno='$it'" },
            dvcId?.takeUnless { it == "null" }?.let { "dvc_id='$it'" },
            month.takeUnless { it == "null" }?.let { "part_mm='$it'" },
            startDate.takeUnless { it == "null" }?.let { "part_dt>='$it'" },
            endDate.takeUnless { it == "null" }?.let { "part_dt<='$it'" }
        ).joinToString(" and ")

        val paramsCheck: Boolean = queryParams.contains("part_mm")
        var personalData: List<DestinationPersonalData>

        if(paramsCheck) {
            println("세그먼트 조회")
            personalData = locationDestinationRepository.getDestinationSegmentData(queryParams)
        } else {
            println("개인 조회")
            personalData = locationDestinationRepository.getDestinationPersonalData(queryParams)
        }

        val personalGroupedData = personalData.groupBy { DestinationPersonalAddH3Data(it.memberId, it.plyno, it.dvcId, it.endH3,0, 0, transformCellToBoundary(it.endH3)) }
        val personalCountPerGroup = personalGroupedData.mapValues { it.value.size }
        val destinationPersonalRankData = personalCountPerGroup
            .toList()
            .sortedByDescending { it.second }
            .fold(mutableListOf<DestinationPersonalAddH3Data>()) { acc, (group, count) ->
                val lastRank = acc.lastOrNull()?.rank ?: 0
                val rank = if (count == acc.lastOrNull()?.count) lastRank else lastRank + 1
                acc.add(DestinationPersonalAddH3Data(group.memberId, group.plyno, group.dvcId, group.endH3, count, rank, transformCellToBoundary(group.endH3)))
                acc
            }
        println(destinationPersonalRankData)
        return destinationPersonalRankData
    }
}
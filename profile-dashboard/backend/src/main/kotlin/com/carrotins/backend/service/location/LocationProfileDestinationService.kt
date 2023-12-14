package com.carrotins.backend.service.location

import com.carrotins.backend.repository.location.DestinationPersonalRankData
import com.carrotins.backend.repository.location.LocationDestinationRepository
import org.springframework.stereotype.Service

@Service
class LocationProfileDestinationService (
    private val locationDestinationRepository: LocationDestinationRepository
){
    fun getDestinationPersonalData(
        memberId: String?,
        plyNo: String?,
        dvcId: String?,
        startDate: String,
        endDate: String
    ): List<DestinationPersonalRankData>{

        val queryParams = listOfNotNull(
            memberId?.takeUnless { it == "null" }?.let { "member_id='$it'" },
            plyNo?.takeUnless { it == "null" }?.let { "plyno='$it'" },
            dvcId?.takeUnless { it == "null" }?.let { "dvc_id='$it'" },
            startDate.takeUnless { it == "null" }?.let { "part_dt>='$it'" },
            endDate.takeUnless { it == "null" }?.let { "part_dt<='$it'" }
        ).joinToString(" and ")

        println(queryParams)

        val containYn = queryParams.contains("mem")
        println(containYn)

        val personalData = locationDestinationRepository.getDestinationPersonalData(queryParams)

        val personalGroupedData = personalData.groupBy { DestinationPersonalRankData(it.memberId, it.plyno, it.dvcId, it.endH3, 0, 0) }
        val personalCountPerGroup = personalGroupedData.mapValues { it.value.size }
        val destinationPersonalRankData = personalCountPerGroup
            .toList()
            .sortedByDescending { it.second }
            .fold(mutableListOf<DestinationPersonalRankData>()) { acc, (group, count) ->
                val lastRank = acc.lastOrNull()?.rank ?: 0
                val rank = if (count == acc.lastOrNull()?.count) lastRank else lastRank + 1
                acc.add(DestinationPersonalRankData(group.memberId, group.plyno, group.dvcId, group.endH3, count, rank))
                acc
            }

        return destinationPersonalRankData
    }
}
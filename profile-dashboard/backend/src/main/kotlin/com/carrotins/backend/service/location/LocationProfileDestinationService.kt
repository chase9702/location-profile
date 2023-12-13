package com.carrotins.backend.service.location

import com.carrotins.backend.repository.location.DestinationPersonalData
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
    ): List<DestinationPersonalData>{

        val queryParams = listOfNotNull(
            memberId?.takeUnless { it == "null" }?.let { "member_id='$it'" },
            plyNo?.takeUnless { it == "null" }?.let { "plyno='$it'" },
            dvcId?.takeUnless { it == "null" }?.let { "dvc_id='$it'" },
            startDate.takeUnless { it == "null" }?.let { "part_dt>='$it'" },
            endDate.takeUnless { it == "null" }?.let { "part_dt<='$it'" }
        ).joinToString(" and ")

        println(queryParams)

        val dataList = locationDestinationRepository.getDestinationPersonalData(queryParams)

        val groupedData = dataList.groupBy { Pair(it.memberId, it.plyno) to Pair(it.dvcId, it.endH3) }
        val countPerGroup = groupedData.mapValues { it.value.size }
        val rankedData = countPerGroup
            .toList()
            .sortedByDescending { it.second }
            .mapIndexed { index, (group, count) ->
                DestinationPersonalRankData(group.first.first, group.first.second, group.second.first, group.second.second, count, (index + 1))
            }

        // 출력
        rankedData.forEach { println(it) }



        return dataList
    }
}
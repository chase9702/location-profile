package com.carrotins.backend.service.location

import com.carrotins.backend.repository.location.DestinationPersonalData
import com.carrotins.backend.repository.location.LocationDestinationRepository
import org.springframework.stereotype.Service

@Service
class LocationProfileDestinationService (
    private val locationDestinationRepository: LocationDestinationRepository
){
    fun getDestinationPersonalData(
        memberId: String?, plyNo: String?, dvcId: String?
    ): List<DestinationPersonalData>{

        val queryParams = listOfNotNull(
            memberId?.takeUnless { it == "null" }?.let { "member_id='$it'" },
            plyNo?.takeUnless { it == "null" }?.let { "plyno='$it'" },
            dvcId?.takeUnless { it == "null" }?.let { "dvc_id='$it'" }
        ).joinToString("")

        return locationDestinationRepository.getDestinationPersonalData(queryParams)
    }
}
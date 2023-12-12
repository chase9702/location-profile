package com.carrotins.backend.api.location

import com.carrotins.backend.repository.location.DestinationPersonalData
import com.carrotins.backend.service.location.LocationProfileDestinationService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
@Tag(name = "Location controller")
@RestController
class LocationProfileDestinationController (
    private val locationProfileDestinationService: LocationProfileDestinationService
) {
    @GetMapping("/api/location/destination/")
    fun getDestinationPersonalData(
        @RequestParam("member_id") memberId: String,
        @RequestParam("plyno") plyNo: String,
        @RequestParam("dvc_id") dvcId: String
    ): List<DestinationPersonalData>{
        return locationProfileDestinationService.getDestinationPersonalData(memberId, plyNo, dvcId)
    }
}
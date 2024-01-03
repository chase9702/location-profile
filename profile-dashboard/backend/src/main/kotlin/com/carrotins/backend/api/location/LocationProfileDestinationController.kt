package com.carrotins.backend.api.location

import com.carrotins.backend.service.location.LocationProfileDestinationService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Location controller")
@RestController
@RequestMapping("/api/location/destination")
class LocationProfileDestinationController(
    private val locationProfileDestinationService: LocationProfileDestinationService
) {
    @GetMapping("/personal")
    fun getDestinationPersonalData(
        @RequestParam("member_id") memberId: Int?,
        @RequestParam("plyno") plyNo: String?,
        @RequestParam("dvc_id") dvcId: String?,
        @RequestParam("month") month: String?,
        @RequestParam("start_date") startDate: String?,
        @RequestParam("end_date") endDate: String?,
    ): Any {
        return locationProfileDestinationService.getDestinationPersonalData(
            memberId,
            plyNo,
            dvcId,
            month,
            startDate,
            endDate
        )
    }

}
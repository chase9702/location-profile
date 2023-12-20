package com.carrotins.backend.api.location

import com.carrotins.backend.repository.location.LocationAddressData
import com.carrotins.backend.service.location.LocationProfileAddressService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Location controller")
@RestController
@RequestMapping("/api/location")
class LocationProfileAddressController (
    private val locationProfileAddressService: LocationProfileAddressService
) {
    @GetMapping("/address")
    fun getAddressData (
        @RequestParam("address") address: String,
        @RequestParam("ln") ln: String,
        @RequestParam("lt") lt: String,
    ): List<LocationAddressData> {
        return locationProfileAddressService.getLocationAddress(address, ln, lt)
    }
}
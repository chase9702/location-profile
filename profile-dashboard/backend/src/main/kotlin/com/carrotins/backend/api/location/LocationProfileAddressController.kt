package com.carrotins.backend.api.location

import com.carrotins.backend.repository.location.LocationAddressBoundaryData
import com.carrotins.backend.repository.location.LocationAddressH3Data
import com.carrotins.backend.service.location.LocationProfileAddressService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Location controller")
@RestController
@RequestMapping("/api/location/address")
class LocationProfileAddressController (
    private val locationProfileAddressService: LocationProfileAddressService
) {
    @GetMapping("/boundary")
    fun getAddressData (
        @RequestParam("sd") sd: String,
        @RequestParam("ln") ln: String,
        @RequestParam("lt") lt: String,
    ): List<LocationAddressBoundaryData> {
        return locationProfileAddressService.getLocationAddress(sd, ln, lt)
    }

    @GetMapping("/h3")
    fun getAddressH3Data (
        @RequestParam("sd") sd: String,
        @RequestParam("ln") ln: String,
        @RequestParam("lt") lt: String,
    ): List<LocationAddressH3Data> {
        return locationProfileAddressService.getLocationH3Address(sd, ln, lt)
    }
}
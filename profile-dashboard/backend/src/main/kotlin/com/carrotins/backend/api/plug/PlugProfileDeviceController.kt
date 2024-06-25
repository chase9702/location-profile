package com.carrotins.backend.api.plug

import com.carrotins.backend.repository.plug.DeviceTop100Data
import com.carrotins.backend.repository.plug.DeviceTripData
import com.carrotins.backend.service.plug.PlugProfileDeviceService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.util.*

@Tag(name = "Plug device controller")
@RestController
@RequestMapping("/api/plug/device")
@PreAuthorize("hasAnyAuthority('ROLE_DASHBOARD')")
class PlugProfileDeviceController(
    private val plugProfileDeviceService: PlugProfileDeviceService
) {

    @GetMapping("/top/{deviceGb}")
    fun getDeviceTopData(
        @PathVariable("deviceGb") deviceGb: String,
        @RequestParam("date") date: String
    ): List<DeviceTop100Data> {
        return plugProfileDeviceService.getDeviceTopData(deviceGb, date)
    }

    @GetMapping("/top/trip")
    fun getTripDataFromTopDevice(
        @RequestParam("device_id") deviceId: String,
        @RequestParam("device_gb") deviceGb: String,
        @RequestParam("date") date: String
    ): List<DeviceTripData> {
        return plugProfileDeviceService.getTripDataFromTopDevice(deviceId, deviceGb, date)
    }

}
package com.carrotins.backend.api.plug

import com.carrotins.backend.repository.plug.DeviceTop100Data
import com.carrotins.backend.repository.plug.DeviceTripData
import com.carrotins.backend.service.plug.PlugProfileDeviceService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * Created by alvin on 2023/09/13.
 */
@Tag(name = "Plug device controller")
@RestController
@RequestMapping("/api/plug/device")
class PlugProfileDeviceController(
    private val plugProfileDeviceService: PlugProfileDeviceService
) {

    @GetMapping("/top/{deviceGb}")
    fun getDeviceTopData(@PathVariable("deviceGb") deviceGb: String): List<DeviceTop100Data> {
        return plugProfileDeviceService.getDeviceTopData(deviceGb)
    }

    @GetMapping("/top/trip")
    fun getTripDataFromTopDevice(
        @RequestParam("deviceId") deviceId: String,
        @RequestParam("deviceGb") deviceGb: String
    ): List<DeviceTripData> {
        return plugProfileDeviceService.getTripDataFromTopDevice(deviceId, deviceGb)
    }

}
package com.carrotins.backend.api.plug

import com.carrotins.backend.repository.plug.DeviceTop100Data
import com.carrotins.backend.service.plug.PlugProfileDeviceService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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
    fun getDeviceTopData(@PathVariable("deviceGb") deviceGb:String,):List<DeviceTop100Data>{
        return plugProfileDeviceService.getDeviceTopData(deviceGb)
    }

}
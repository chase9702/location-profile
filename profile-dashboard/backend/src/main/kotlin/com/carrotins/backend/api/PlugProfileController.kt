package com.carrotins.backend.api

import com.carrotins.backend.repository.HiveDataTable
import com.carrotins.backend.service.PlugProfileService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.carrotins.backend.repository.ZeroTripTable

/**
 * Created by alvin on 2023/07/19.
 */
@Tag(name = "Plug controller")
@RestController
@RequestMapping("/api/plug")
class PlugProfileController(
    private val plugProfileService: PlugProfileService
) {
    @GetMapping("/test")
    fun getTestData():List<HiveDataTable>{
        return plugProfileService.getTest()
    }
    @GetMapping("/device")
    fun getDeviceData():List<HiveDataTable>{
        return plugProfileService.getDevicegb()
    }
    @GetMapping("/zerogpsrt")
    fun getZgpsRTData():List<ZeroTripTable>{
        return plugProfileService.getZgpsRT()
    }
}
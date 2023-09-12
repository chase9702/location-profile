package com.carrotins.backend.api

import com.carrotins.backend.repository.DeviceProductCount
import com.carrotins.backend.repository.InterpolationTripInfo
import com.carrotins.backend.service.PlugProfileService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.carrotins.backend.repository.ZeroGpsTripInfo
import com.carrotins.backend.repository.CarProductNameInfo


/**
 * Created by alvin on 2023/07/19.
 */
@Tag(name = "Plug controller")
@RestController
@RequestMapping("/api/plug")
class PlugProfileController(
    private val plugProfileService: PlugProfileService
) {
    @GetMapping("/device-info")
    fun getDeviceData():List<DeviceProductCount>{
        return plugProfileService.getDeviceProductCount()
    }
    @GetMapping("/car-product-name-info")
    fun getCarnmData():List<CarProductNameInfo>{
        return plugProfileService.getCarProductNameInfo()
    }
    @GetMapping("/zero-gps-trip-info")
    fun getZgpsRTData():List<ZeroGpsTripInfo>{
        return plugProfileService.getZeroGpsTripInfo()
    }
    @GetMapping("/interpolation-trip-info")
    fun gettrip02RTData():List<InterpolationTripInfo>{
        return plugProfileService.getInterpolationTripInfo()
    }
}
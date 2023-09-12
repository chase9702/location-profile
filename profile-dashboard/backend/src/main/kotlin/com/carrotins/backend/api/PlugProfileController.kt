package com.carrotins.backend.api

import com.carrotins.backend.repository.DeviceProductCount
import com.carrotins.backend.repository.InterpolationTripInfo
import com.carrotins.backend.service.PlugProfileService
import io.swagger.v3.oas.annotations.tags.Tag
import com.carrotins.backend.repository.ZeroGpsTripInfo
import com.carrotins.backend.repository.CarProductNameInfo
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.CrossOrigin;



/**
 * Created by alvin on 2023/07/19.
 */
@Tag(name = "Plug controller")
@RestController
@CrossOrigin(origins = ["http://localhost:3000"]) // 요청을 허용할 origin을 지정
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

    @PostMapping("/click-test")
    fun search(@RequestBody searchData: String): String {
        // searchData를 사용하여 데이터 조회 또는 처리 수행

        // 예: 간단하게 searchData를 대문자로 변환하여 응답
        val result = searchData.toUpperCase()

        return "서버에서 받은 데이터: $result"
    }
}
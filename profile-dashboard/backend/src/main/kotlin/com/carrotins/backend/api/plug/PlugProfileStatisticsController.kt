package com.carrotins.backend.api.plug

import com.carrotins.backend.repository.plug.DeviceProductCount
import com.carrotins.backend.repository.plug.InterpolationTripDailyInfo
import com.carrotins.backend.service.plug.PlugProfileStatisticsService
import io.swagger.v3.oas.annotations.tags.Tag
import com.carrotins.backend.repository.plug.ZeroGpsTripInfo
import com.carrotins.backend.repository.plug.CarProductNameInfo
import org.springframework.web.bind.annotation.*


/**
 * Created by alvin on 2023/07/19.
 */
@Tag(name = "Plug statistics controller")
@RestController
@RequestMapping("/api/plug/statistic")
class PlugProfileStatisticsController(
    private val plugProfileStatisticsService: PlugProfileStatisticsService
) {
    @GetMapping("/device-info")
    fun getDeviceData():List<DeviceProductCount>{
        return plugProfileStatisticsService.getDeviceProductCount()
    }
    @GetMapping("/car-product-name-info")
    fun getCarnmData():List<CarProductNameInfo>{
        return plugProfileStatisticsService.getCarProductNameInfo()
    }
    @GetMapping("/zero-gps-trip-info")
    fun getZgpsRTData():List<ZeroGpsTripInfo>{
        return plugProfileStatisticsService.getZeroGpsTripInfo()
    }
    @GetMapping("/interpolation-trip-daily-info")
    fun getInterpolationTripDailyInfoData():List<InterpolationTripDailyInfo>{
        return plugProfileStatisticsService.getInterpolationTripDailyInfo()
    }

    @PostMapping("/click-test")
    fun search(@RequestBody searchData: String): String {
        val result = searchData.toUpperCase()

        return "서버에서 받은 데이터: $result"
    }
}
package com.carrotins.backend.api.plug

import com.carrotins.backend.repository.plug.*
import com.carrotins.backend.service.plug.PlugProfileStatisticsService
import io.swagger.v3.oas.annotations.tags.Tag
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
    @GetMapping("/firmware-version-info")
    fun getFirmwareVersionInfoData():List<FirmwareVersionInfo>{
        return plugProfileStatisticsService.getFirmwareVersionInfo()
    }
    @GetMapping("/zero-gps-trip-monthly-info")
    fun getZeroGpsTripMonthlyInfoData():List<ZeroGpsTripMonthlyInfo>{
        return plugProfileStatisticsService.getZeroGpsTripMonthlyInfo()
    }
    @GetMapping("/zero-gps-trip-daily-info")
    fun getZeroGpsTripDailyInfoData():List<ZeroGpsTripDailyInfo>{
        return plugProfileStatisticsService.getZeroGpsTripDailyInfo()
    }
    @GetMapping("/interpolation-trip-daily-info")
    fun getInterpolationTripDailyInfoData():List<InterpolationTripDailyInfo>{
        return plugProfileStatisticsService.getInterpolationTripDailyInfo()
    }

    @GetMapping("/interpolation-trip-monthly-info")
    fun getInterpolationTripMonthlyInfoData():List<InterpolationTripMonthlyInfo>{
        return plugProfileStatisticsService.getInterpolationTripMonthlyInfo()
    }

    @PostMapping("/click-test")
    fun search(@RequestBody searchData: String): String {
        val result = searchData.toUpperCase()

        return "서버에서 받은 데이터: $result"
    }
}
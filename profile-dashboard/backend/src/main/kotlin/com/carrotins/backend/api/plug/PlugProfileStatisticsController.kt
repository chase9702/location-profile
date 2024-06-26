package com.carrotins.backend.api.plug

import com.carrotins.backend.repository.plug.*
import com.carrotins.backend.service.plug.PlugProfileStatisticsService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*


@Tag(name = "Plug statistics controller")
@RestController
@RequestMapping("/api/plug/statistic")
@PreAuthorize("hasAnyAuthority('ROLE_DASHBOARD')")
class PlugProfileStatisticsController(
    private val plugProfileStatisticsService: PlugProfileStatisticsService
) {
    @GetMapping("/firmware-version-info")
    fun getFirmwareVersionInfoData(@RequestParam("dvc_mdl") deviceModel: String):List<FirmwareVersionInfo>{
        return plugProfileStatisticsService.getFirmwareVersionInfo(deviceModel)
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
}
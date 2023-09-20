package com.carrotins.backend.service.plug

import com.carrotins.backend.repository.plug.*
import org.springframework.stereotype.Service
import java.math.BigDecimal


/**
 * Created by alvin on 2023/07/19.
 */
@Service
class PlugProfileStatisticsService(
    private val plugStatisticsRepository: PlugStatisticsRepository
) {
    fun getFirmwareVersionInfo(): List<FirmwareVersionInfo>{
        return plugStatisticsRepository.getFirmwareVersionInfoData()
    }
    fun getZeroGpsTripMonthlyInfo(): List<ZeroGpsTripMonthlyInfo> {
        return plugStatisticsRepository.getZeroGpsTripMonthlyInfoData()
    }

    fun getZeroGpsTripDailyInfo(): List<ZeroGpsTripDailyInfo> {
        return plugStatisticsRepository.getZeroGpsTripDailyInfoData()
    }

    fun getInterpolationTripMonthlyInfo(): List<InterpolationTripMonthlyInfo>{
        return plugStatisticsRepository.getInterpolationTripMonthlyInfoData()
    }
    fun getInterpolationTripDailyInfo(): List<InterpolationTripDailyInfo> {
        return plugStatisticsRepository.getInterpolationTripDailyInfoData()
    }

}
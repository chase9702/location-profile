package com.carrotins.backend.service.plug

import com.carrotins.backend.repository.plug.*
import org.springframework.stereotype.Service


/**
 * Created by alvin on 2023/07/19.
 */
@Service
class PlugProfileStatisticsService(
    private val plugStatisticsRepository: PlugStatisticsRepository
) {
    fun getFirmwareVersionInfo(deviceModel: String): List<FirmwareVersionInfo> {
        return plugStatisticsRepository.getFirmwareVersionInfoData(deviceModel)
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
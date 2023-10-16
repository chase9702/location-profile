package com.carrotins.backend.service.plug

import com.carrotins.backend.repository.plug.*
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service


/**
 * Created by alvin on 2023/07/19.
 */
@Service
class PlugProfileStatisticsService(
    private val plugStatisticsRepository: PlugStatisticsRepository
) {
    @Cacheable("cacheFirmwareVersion")
    fun getFirmwareVersionInfo(): List<FirmwareVersionInfo>{
        return plugStatisticsRepository.getFirmwareVersionInfoData()
    }
    @Cacheable("cacheZeroGpsTripMonthly")
    fun getZeroGpsTripMonthlyInfo(): List<ZeroGpsTripMonthlyInfo> {
        return plugStatisticsRepository.getZeroGpsTripMonthlyInfoData()
    }
    @Cacheable("cacheZeroGpsTripDaily")
    fun getZeroGpsTripDailyInfo(): List<ZeroGpsTripDailyInfo> {
        return plugStatisticsRepository.getZeroGpsTripDailyInfoData()
    }
    @Cacheable("cacheInterpolationTripMonthly")
    fun getInterpolationTripMonthlyInfo(): List<InterpolationTripMonthlyInfo>{
        return plugStatisticsRepository.getInterpolationTripMonthlyInfoData()
    }
    @Cacheable("cacheInterpolationTripDaily")
    fun getInterpolationTripDailyInfo(): List<InterpolationTripDailyInfo> {
        return plugStatisticsRepository.getInterpolationTripDailyInfoData()
    }

}
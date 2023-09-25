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
    // 펌워에 버전 Top 7 처리 로직
//    fun getFirmwareVersionInfo(): List<FirmwareVersionInfo> {
//        val firmwareVersionData = plugStatisticsRepository.getFirmwareVersionInfoData()
//        val groupFirmwareData = firmwareVersionData.groupBy { it.bsDt }
//
//        val top7FirmwareVersionData = groupFirmwareData.flatMap { (_, group) ->
//            group.sortedByDescending { it.sumFirmwareVersion }
//                .take(7)
//        }
//
//        return top7FirmwareVersionData
//    }
    fun getFirmwareVersionInfo(): List<FirmwareVersionInfo> {
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
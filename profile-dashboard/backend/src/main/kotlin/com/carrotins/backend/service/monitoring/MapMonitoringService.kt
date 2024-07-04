@file:Suppress("ktlint:standard:no-wildcard-imports")

package com.carrotins.backend.service.monitoring

import com.carrotins.backend.repository.monitoring.*
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

/**
 * Created by alvin on 2024. 6. 13
 */
@Service
class MapMonitoringService(
    private val mapMonitoringRepository: MapMonitoringRepository,
) {
    @Cacheable("cacheTop100Table")
    fun getTop100Data(
        behavior: String,
        hour: String?,
        startDate: String?,
        endDate: String?,
    ): List<Top100TableData> {
        //        1. 시간까지조회 할 경우
        return if (hour != null) {
            mapMonitoringRepository.getTop100dataByHour(
                hour = hour,
                behavior = behavior,
                startDate = startDate,
                endDate = endDate,
            )
        } else { //        2. 시간 조회는 하지 않는 겨우
            mapMonitoringRepository.getTop100dataByDay(
                behavior = behavior,
                startDate = startDate,
                endDate = endDate,
            )
        }
    }

    fun getMonitoringPublicMapData(addrCd: String): List<Top100PublicMapData> = mapMonitoringRepository.getPublicMapData(addrCd)

    fun getMonitoringBBIMapData(
        addrCd: String,
        hour: String,
        startDate: String,
        endDate: String,
    ): List<Top100BBIMapData> =
        if (hour != "all") {
            mapMonitoringRepository.getBbiMapDataByHour(
                hour = hour,
                addrCd = addrCd,
                startDate = startDate,
                endDate = endDate,
            )
        } else { //        2. 시간 조회는 하지 않는 겨우
            mapMonitoringRepository.getBbiMapDataByDay(
                addrCd = addrCd,
                startDate = startDate,
                endDate = endDate,
            )
        }

    fun getMonitoringAiMapData(
        addrCd: String,
        hour: String,
        partDt: String,
    ): List<Top100AiMapData> = mapMonitoringRepository.getAiMapData(addrCd = addrCd, hour = hour, date = partDt)

    fun getMonitoringBBIMapMetaData(
        hex: String,
        hour: String,
        startDate: String,
        endDate: String,
    ): List<BBIMetaData> =
        if (hour != "all") {
            mapMonitoringRepository.getBbiMapMetaDataByHour(
                hex = hex,
                hour = hour,
                startDate = startDate,
                endDate = endDate,
            )
        } else { //        2. 시간 조회는 하지 않는 겨우
            mapMonitoringRepository.getBbiMapMetaDataByDay(
                hex = hex,
                startDate = startDate,
                endDate = endDate,
            )
        }
}

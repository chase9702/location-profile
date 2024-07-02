package com.carrotins.backend.service.monitoring

import com.carrotins.backend.repository.monitoring.*
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

/**
 * Created by alvin on 2024. 6. 13..
 */
@Service
class MapMonitoringService(
    private val mapMonitoringRepository: MapMonitoringRepository,
) {
    @Cacheable("cacheTop100Table")
    fun getTop100Data(
        behavior: String,
        hour: String?,
        date: String,
    ): List<Top100TableData> = mapMonitoringRepository.getTop100data(hour = hour, date = date, behavior = behavior)

    fun getMonitoringPublicMapData(addrCd: String): List<Top100PublicMapData> = mapMonitoringRepository.getPublicMapData(addrCd)

    fun getMonitoringBBIMapData(
        addrCd: String,
        hour: String?,
        date: String,
    ): List<Top100BBIMapData> {
        val result = mapMonitoringRepository.getBbiMapData(date = date, hour = hour, addrCd = addrCd)
        return result
    }

    fun getMonitoringAiMapData(
        addrCd: String,
        hour: String,
        date: String,
    ): List<Top100AiMapData> = mapMonitoringRepository.getAiMapData(addrCd = addrCd, hour = hour, date = date)

    fun getMonitoringBBIMapMetaData(
        hex: String,
        hour: String?,
        partDt: String,
    ): List<BBIMetaData> = mapMonitoringRepository.getBbiMapMetaData(hex = hex, hour = hour, partDt = partDt)
}

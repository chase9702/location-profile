package com.carrotins.backend.service

import com.carrotins.backend.repository.BbiMapData
import com.carrotins.backend.repository.MapMonitoringRepository
import com.carrotins.backend.repository.Top100TableData
import org.springframework.stereotype.Service

/**
 * Created by alvin on 2024. 6. 13..
 */
@Service
class MapService(
    private val mapMonitoringRepository: MapMonitoringRepository
) {
    fun getTop100Data(hour: String?, date: String?): List<Top100TableData> {

        return mapMonitoringRepository.getTop100data(hour, date)
    }

    fun getMonitoringMapData(address: String?): List<BbiMapData> {


        return mapMonitoringRepository.getBbiMapData(address)
    }
}
package com.carrotins.backend.service.plug

import com.carrotins.backend.repository.plug.DeviceTop100Data
import com.carrotins.backend.repository.plug.DeviceTripData
import com.carrotins.backend.repository.plug.PlugDeviceRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

/**
 * Created by alvin on 2023/09/18.
 */
@Service
class PlugProfileDeviceService(
    private val plugDeviceRepository: PlugDeviceRepository
) {
    @Cacheable("cacheDeviceTop")
    fun getDeviceTopData(deviceGb: String, date: String): List<DeviceTop100Data> {
        return plugDeviceRepository.getDeviceTopData(deviceGb, date)
    }
    @Cacheable("cacheTripDataFromTopDevice")
    fun getTripDataFromTopDevice(deviceId: String, deviceGb: String, date: String): List<DeviceTripData> {
        return plugDeviceRepository.getTripDataFromTopDevice(deviceId, deviceGb, date)
    }
}
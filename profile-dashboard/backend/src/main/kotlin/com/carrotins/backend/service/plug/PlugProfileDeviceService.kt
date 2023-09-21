package com.carrotins.backend.service.plug

import com.carrotins.backend.repository.plug.DeviceTop100Data
import com.carrotins.backend.repository.plug.DeviceTripData
import com.carrotins.backend.repository.plug.PlugDeviceRepository
import org.springframework.stereotype.Service

/**
 * Created by alvin on 2023/09/18.
 */
@Service
class PlugProfileDeviceService(
    private val plugDeviceRepository: PlugDeviceRepository
) {
    fun getDeviceTopData(deviceGb: String): List<DeviceTop100Data> {

        return plugDeviceRepository.getDeviceTopData(deviceGb)
    }

    fun getTripDataFromTopDevice(deviceId: String, deviceGb: String): List<DeviceTripData> {
        return plugDeviceRepository.getTripDataFromTopDevice(deviceId, deviceGb)
    }
}
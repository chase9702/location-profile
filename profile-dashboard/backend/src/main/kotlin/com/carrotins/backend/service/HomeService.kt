package com.carrotins.backend.service

import com.carrotins.backend.repository.HomeDeviceInfo
import com.carrotins.backend.repository.HomeRepository
import org.springframework.stereotype.Service

/**
 * Created by alvin on 2023/04/27.
 */
@Service
class HomeService(
    private val homeRepository: HomeRepository
) {
    fun getHomeDeviceInfo(): List<HomeDeviceInfo> {
        return homeRepository.getHomeDeviceInfo()
    }
}
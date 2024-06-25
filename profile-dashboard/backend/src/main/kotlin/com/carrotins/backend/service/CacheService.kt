package com.carrotins.backend.service

import org.springframework.stereotype.Service
import org.springframework.cache.annotation.CacheEvict

@Service
class CacheService {

    @CacheEvict(value = ["cacheFirmwareVersion"
        ,"cacheZeroGpsTripMonthly"
        ,"cacheZeroGpsTripDaily"
        ,"cacheInterpolationTripMonthly"
        ,"cacheInterpolationTripDaily"
        ,"cacheDeviceTop"
        ,"cacheTripDataFromTopDevice"
        ,"cacheHomeDevice"
        ,"cacheTop100Table"], allEntries = true)
    fun clearALLCache() = Unit
}
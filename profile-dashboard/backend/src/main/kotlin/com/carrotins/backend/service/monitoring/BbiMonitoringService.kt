package com.carrotins.backend.service.monitoring

import com.carrotins.backend.repository.monitoring.BbiAbnormalData
import com.carrotins.backend.repository.monitoring.BbiDetectionData
import com.carrotins.backend.repository.monitoring.BbiMonitoringRepository
import jdk.jfr.Threshold
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class BbiMonitoringService(
    private val bbiMonitoringRepository: BbiMonitoringRepository
) {
    fun buildQueryParams(startDate: String?, endDate: String?, metric: String?, threshold: String?, unit: String?): String {
        return listOfNotNull(
            startDate.takeUnless { it == null }?.let { "part_dt>='$it'" },
            endDate.takeUnless { it == null }?.let { "part_dt<='$it'" },
            metric.takeUnless { it == null || it == "total" }?.let { "metric='$it'" },
            threshold.takeUnless { it == null || it == "total" }?.let { "threshold='$it'" },
            unit.takeUnless { it == null }?.let { "unit='$it'" }
        ).joinToString(" and ")
    }
    @Cacheable("cacheBbiAbnormal")
    fun getBbiAbnormal(
        startDate: String?,
        endDate: String?,
        metric: String?,
        threshold: String?,
        unit: String?,
    ): List<BbiAbnormalData> {
        val queryParams = buildQueryParams(startDate, endDate, metric, threshold, unit)
        print(queryParams)
        return bbiMonitoringRepository.getBbiAbnormalData(queryParams)
    }
    @Cacheable("cacheBbiDetection")
    fun getBbiDetection(
        startDate: String?,
        endDate: String?,
        id: String?,
    ): List<BbiDetectionData> {
        println(startDate)
        println(endDate)
        println(id)
        return bbiMonitoringRepository.getBbiDetectionData()
    }
}
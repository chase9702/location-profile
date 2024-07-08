package com.carrotins.backend.service.monitoring

import com.carrotins.backend.repository.monitoring.BbiAbnormalData
import com.carrotins.backend.repository.monitoring.BbiDetectionData
import com.carrotins.backend.repository.monitoring.BbiMonitoringRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class BbiMonitoringService(
    private val bbiMonitoringRepository: BbiMonitoringRepository
) {
    fun buildBbiAbnormalQueryParams(startDate: String?, endDate: String?, metric: String?, threshold: String?, distance: String?, id: String?): String {
        return listOfNotNull(
            startDate.takeUnless { it == null }?.let { "part_dt>='$it'" },
            endDate.takeUnless { it == null }?.let { "part_dt<='$it'" },
            metric.takeUnless { it == null || it == "total" }?.let { "metric='$it'" },
            threshold.takeUnless { it == null || it == "total" }?.let { "threshold='$it'" },
            distance.takeUnless { it == null}?.let { "time_or_dst='$it'" },
            id.takeUnless { it == null}?.let { "unit='$it'" },
        ).joinToString(" and ")
    }

    fun buildBbiDetectionQueryParams(hour: String?, startDate: String?, endDate: String?): String {
        return listOfNotNull(
            hour.takeUnless { it == null }?.let { "hour='$it'" },
            startDate.takeUnless { it == null }?.let { "part_dt>='$it'" },
            endDate.takeUnless { it == null }?.let { "part_dt<='$it'" },
        ).joinToString(" and ")
    }

    @Cacheable("cacheBbiAbnormal")
    fun getBbiAbnormal(
        startDate: String?,
        endDate: String?,
        metric: String?,
        threshold: String?,
        distance: String?,
        id: String?,
    ): List<BbiAbnormalData> {
        val queryParams = buildBbiAbnormalQueryParams(startDate, endDate, metric, threshold, distance, id)

        return bbiMonitoringRepository.getBbiAbnormalData(queryParams)
    }

    @Cacheable("cacheBbiDetection")
    fun getBbiDetection(
        hour: String?,
        startDate: String?,
        endDate: String?,
        id: String?,
    ): List<BbiDetectionData> {
        val queryParams = buildBbiDetectionQueryParams(hour, startDate, endDate)

        return when (id) {
            "trip_id" -> bbiMonitoringRepository.getBbiDetectionTripData(queryParams)
            "dvc_id" -> bbiMonitoringRepository.getBbiDetectionDeviceIdData(queryParams)
            "member_id" -> bbiMonitoringRepository.getBbiDetectionMemberData(queryParams)
            else -> bbiMonitoringRepository.getBbiDetectionTripData(queryParams)
        }
    }
}
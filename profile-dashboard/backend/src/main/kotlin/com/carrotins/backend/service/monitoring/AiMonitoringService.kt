package com.carrotins.backend.service.monitoring

import com.carrotins.backend.repository.monitoring.AiDetectionData
import com.carrotins.backend.repository.monitoring.AiMonitoringRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class AiMonitoringService (
    private val aiMonitoringRepository: AiMonitoringRepository
) {
    fun buildQueryParams(hour: String?, startDate: String?, endDate: String?, id: String?, status: String?): String {
        return listOfNotNull(
            hour?.takeUnless { it == null }?.let { "hour='$it'" },
            startDate.takeUnless { it == null }?.let { "part_dt>='$it'" },
            endDate.takeUnless { it == null }?.let { "part_dt<='$it'" },
            id.takeUnless { it == null }?.let { "id='$it'" },
            status.takeUnless { it == null }?.let { "stcd='$it'" }
        ).joinToString(" and ")
    }

    @Cacheable("cacheAiDetection")
    fun getAiDetection(
        hour: String?,
        startDate: String?,
        endDate: String?,
        id: String?,
        status: String?,
    ): List<AiDetectionData> {
        val queryParams = buildQueryParams(hour, startDate, endDate, id, status)

        when (id) {
            "trip_id" -> print("trip_id\n")
            "dvc_id" -> print("dvc_id\n")
            "member_id" -> print("member_id\n")
        }

        return when (id) {
            "trip_id" -> aiMonitoringRepository.getAiDetectionTripData()
            "dvc_id" -> aiMonitoringRepository.getAiDetectionTripData()
            "member_id" -> aiMonitoringRepository.getAiDetectionTripData()
            else -> aiMonitoringRepository.getAiDetectionTripData()
        }
    }
}
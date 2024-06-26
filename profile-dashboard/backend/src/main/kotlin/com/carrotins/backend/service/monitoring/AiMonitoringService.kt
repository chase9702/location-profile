package com.carrotins.backend.service.monitoring

import com.carrotins.backend.repository.monitoring.AiDetectionData
import com.carrotins.backend.repository.monitoring.AiMonitoringRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class AiMonitoringService (
    private val aiMonitoringRepository: AiMonitoringRepository
) {
    fun buildQueryParams(hour: String?, startDate: String?, endDate: String?, status: String?): String {
        return listOfNotNull(
            hour?.takeUnless { it == null }?.let { "dtct_hh='$it'" },
            startDate.takeUnless { it == null }?.let { "part_dt>='$it'" },
            endDate.takeUnless { it == null }?.let { "part_dt<='$it'" },
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
        val queryParams = buildQueryParams(hour, startDate, endDate, status)

        when (id) {
            "trip_id" -> print("trip_id\n")
            "dvc_id" -> print("dvc_id\n")
            "member_id" -> print("member_id\n")
        }

        return when (id) {
            "trip_id" -> aiMonitoringRepository.getAiDetectionTripData(queryParams)
            "dvc_id" -> aiMonitoringRepository.getAiDetectionDeviceIdData(queryParams)
            "member_id" -> aiMonitoringRepository.getAiDetectionMemberData(queryParams)
            else -> aiMonitoringRepository.getAiDetectionTripData(queryParams)
        }
    }
}
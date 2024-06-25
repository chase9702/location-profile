package com.carrotins.backend.api.monitoring

import com.carrotins.backend.repository.monitoring.AiDetectionData
import com.carrotins.backend.service.monitoring.AiMonitoringService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Monitoring Controller")
@RestController
@RequestMapping("/api/monitoring/ai")
class AiMonitoringController (
    private val aiMonitoringService: AiMonitoringService
) {
    @GetMapping("/detection")
    fun getAiDetectionData(
        @RequestParam("hour") hour: String?,
        @RequestParam("start_date") startDate: String?,
        @RequestParam("end_date") endDate: String?,
        @RequestParam("id") id: String?,
        @RequestParam("status") status: String?,
    ): List<AiDetectionData> {
        return aiMonitoringService.getAiDetection(hour, startDate, endDate, id, status)
    }

}
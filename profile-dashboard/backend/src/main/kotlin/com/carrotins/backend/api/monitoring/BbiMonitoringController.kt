package com.carrotins.backend.api.monitoring

import com.carrotins.backend.repository.monitoring.BbiAbnormalData
import com.carrotins.backend.repository.monitoring.BbiDetectionData
import com.carrotins.backend.service.monitoring.BbiMonitoringService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@Tag(name = "Monitoring Controller")
@RestController
@RequestMapping("/api/monitoring/bbi")
class BbiMonitoringController(
    private val bbiMonitoringService: BbiMonitoringService
) {
    @GetMapping("/abnormal")
    fun getBbiAbnormalData(
        @RequestParam("start_date") startDate: String?,
        @RequestParam("end_date") endDate: String?,
        @RequestParam("metric") metric: String?,
        @RequestParam("threshold") threshold: String?,
        @RequestParam("distance") distance: String?,
        @RequestParam("unit") id: String?,
        ): List<BbiAbnormalData> {
        return bbiMonitoringService.getBbiAbnormal(startDate, endDate, metric, threshold, distance, id)
    }

    @GetMapping("/detection")
    fun getBbiDetectionData(
        @RequestParam("hour") hour: String?,
        @RequestParam("start_date") startDate: String?,
        @RequestParam("end_date") endDate: String?,
        @RequestParam("id") id: String?,
        ): List<BbiDetectionData> {
        return bbiMonitoringService.getBbiDetection(hour, startDate, endDate, id,)
    }
}
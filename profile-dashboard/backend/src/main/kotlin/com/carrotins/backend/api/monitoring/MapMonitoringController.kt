@file:Suppress("ktlint:standard:no-wildcard-imports")

package com.carrotins.backend.api.monitoring

import com.carrotins.backend.repository.monitoring.*
import com.carrotins.backend.service.monitoring.MapMonitoringService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

/**
 * Created by alvin on 2024. 6. 13..
 */
@RestController
@PreAuthorize("hasAnyAuthority('ROLE_DASHBOARD')")
@RequestMapping("/api/monitoring/map")
class MapMonitoringController(
    private val mapMonitoringService: MapMonitoringService,
) {
    @GetMapping("/top100/{behavior}")
    fun getTop100Data(
        @PathVariable("behavior") behavior: String,
        @RequestParam("hour") hour: String?,
        @RequestParam("start_date") startDate: String?,
        @RequestParam("end_date") endDate: String?,
    ): List<Top100TableData> = mapMonitoringService.getTop100Data(behavior, hour, startDate, endDate)

    @GetMapping("/bbi")
    fun getMonitoringBBIMapData(
        @RequestParam("addr_cd") addrCd: String,
        @RequestParam("hour") hour: String,
        @RequestParam("start_date") startDate: String,
        @RequestParam("end_date") endDate: String,
    ): List<Top100BBIMapData> = mapMonitoringService.getMonitoringBBIMapData(addrCd, hour, startDate, endDate)

    @GetMapping("/meta/bbi")
    fun getMonitoringBBIMapMetaData(
        @RequestParam("hex") hex: String,
        @RequestParam("hour") hour: String,
        @RequestParam("start_date") startDate: String,
        @RequestParam("end_date") endDate: String,
    ): List<BBIMetaData> = mapMonitoringService.getMonitoringBBIMapMetaData(hex, hour, startDate, endDate)

    //    @GetMapping("/carrot")
//    fun getMonitoringCarrotMapData(
//        @RequestParam("addr_cd") addrCd: String,
//        @RequestParam("hour") hour: String,
//        @RequestParam("part_dt") partDt: String,
//    ): List<Top100CarrotMapData> {
//        return mapService.getMonitoringCarrotMapData(addrCd, hour, partDt)
//    }
//
    @GetMapping("/ai")
    fun getMonitoringAiMapData(
        @RequestParam("addr_cd") addrCd: String,
        @RequestParam("hour") hour: String,
        @RequestParam("part_dt") partDt: String,
    ): List<Top100AiMapData> = mapMonitoringService.getMonitoringAiMapData(addrCd, hour, partDt)

    @GetMapping("/public")
    fun getMonitoringPublicMapData(
        @RequestParam("addr_cd") addrCd: String,
    ): List<Top100PublicMapData> = mapMonitoringService.getMonitoringPublicMapData(addrCd)
}

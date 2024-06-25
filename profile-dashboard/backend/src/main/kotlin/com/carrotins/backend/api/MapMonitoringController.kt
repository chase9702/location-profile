package com.carrotins.backend.api

import com.carrotins.backend.repository.Top100AiMapData
import com.carrotins.backend.repository.Top100BBIMapData
import com.carrotins.backend.repository.Top100PublicMapData
import com.carrotins.backend.repository.Top100TableData
import com.carrotins.backend.service.MapService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

/**
 * Created by alvin on 2024. 6. 13..
 */
@RestController
@PreAuthorize("hasAnyAuthority('ROLE_DASHBOARD')")
@RequestMapping("/api/monitoring/map")
class MapMonitoringController(
    private val mapService: MapService
) {
    @GetMapping("/top100/{behavior}")
    fun getTop100Data(
        @PathVariable("behavior") behavior: String,
        @RequestParam("hour") hour: String,
        @RequestParam("part_dt") partDt: String,
    ): List<Top100TableData> {
        return mapService.getTop100Data(behavior, hour, partDt)
    }

    @GetMapping("/bbi")
    fun getMonitoringBBIMapData(
        @RequestParam("addr_cd") addrCd: String,
        @RequestParam("hour") hour: String,
        @RequestParam("part_dt") partDt: String,
    ): List<Top100BBIMapData> {
        return mapService.getMonitoringBBIMapData(addrCd, hour, partDt)
    }

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
    ): List<Top100AiMapData> {
        return mapService.getMonitoringAiMapData(addrCd, hour, partDt)
    }

    @GetMapping("/public")
    fun getMonitoringPublicMapData(
        @RequestParam("addr_cd") addrCd: String,
    ): List<Top100PublicMapData> {
        return mapService.getMonitoringPublicMapData(addrCd)
    }

}
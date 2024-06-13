package com.carrotins.backend.api

import com.carrotins.backend.repository.BbiMapData
import com.carrotins.backend.repository.Top100TableData
import com.carrotins.backend.service.MapService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * Created by alvin on 2024. 6. 13..
 */
@RestController
@PreAuthorize("hasAnyAuthority('ROLE_DASHBOARD')")
@RequestMapping("/api/monitoring/map")
class MapMonitoringController(
   private val mapService: MapService
) {
    @GetMapping("/top100")
    fun getTop100Data(
        @RequestParam("hour") hour: String?,
        @RequestParam("date") date: String?,
    ):List<Top100TableData>{
        return mapService.getTop100Data(hour, date)
    }

    @GetMapping("/bbi")
    fun getMonitoringMapData(
        @RequestParam("address") address: String?,
    ):List<BbiMapData>{
        return mapService.getMonitoringMapData(address)
    }

}
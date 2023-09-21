package com.carrotins.backend.api

import com.carrotins.backend.repository.HomeDeviceInfo
import com.carrotins.backend.service.HomeService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by alvin on 2023/04/27.
 */
@Tag(name = "Home controller")
@RestController
@RequestMapping("/api/home")
class HomeController (
    private val homeService : HomeService
){
    @GetMapping("/device-count-info")
    fun getFirmwareVersionInfoData():List<HomeDeviceInfo>{
        return homeService.getHomeDeviceInfo()
    }
}
package com.carrotins.backend.api

import com.carrotins.backend.repository.HiveDataTable
import com.carrotins.backend.service.PlugProfileService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by alvin on 2023/07/19.
 */
@Tag(name = "Plug controller")
@RestController
@RequestMapping("/api/plug")
class PlugProfileController(
    private val plugProfileService: PlugProfileService
) {

    @GetMapping("/test")
    fun getTestData():List<HiveDataTable>{
        return plugProfileService.getTest()
    }
}
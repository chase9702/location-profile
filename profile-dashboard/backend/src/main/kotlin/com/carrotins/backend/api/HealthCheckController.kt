package com.carrotins.backend.api

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by alvin on 2023/05/30.
 */
@RestController
class HealthCheckController {
    @RequestMapping("/api/ping")
    fun ping(): String {
        return "OK"
    }
}
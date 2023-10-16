package com.carrotins.backend.api

import com.carrotins.backend.service.CacheService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
@Tag(name = "Cache clear controller")
@RestController
@RequestMapping("/api/cache")
class CacheController(
    private val cacheService: CacheService
) {
    @GetMapping("/clear")
    fun clearCache() {
        return cacheService.clearALLCache()
    }
}
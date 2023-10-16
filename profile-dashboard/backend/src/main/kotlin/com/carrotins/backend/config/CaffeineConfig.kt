package com.carrotins.backend.config

import com.github.benmanes.caffeine.cache.Caffeine
import org.springframework.cache.CacheManager
import org.springframework.cache.annotation.EnableCaching
import org.springframework.cache.caffeine.CaffeineCacheManager
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.concurrent.TimeUnit

@Configuration
@EnableCaching
class CaffeineConfig {

    @Bean
    fun cacheManger(): CacheManager{
        val cacheManager: CaffeineCacheManager = CaffeineCacheManager()
        cacheManager.setCaffeine(caffeineCacheBuilder())
        return cacheManager
    }

    fun caffeineCacheBuilder(): Caffeine<Any, Any> =
        Caffeine.newBuilder()
            .maximumSize(10000)
            .expireAfterAccess(24,TimeUnit.HOURS)
}
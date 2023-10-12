package com.carrotins.backend.repository
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.annotation.JsonNaming

/**
 * Created by alvin on 2023/09/13.
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class HomeDeviceInfo(
    val bsDt: String,
    val dvcGb: String, // 제조사
    val dvcCount: Int,    // cnt
)
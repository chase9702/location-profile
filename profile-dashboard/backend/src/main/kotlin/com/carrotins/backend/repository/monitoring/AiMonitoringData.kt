package com.carrotins.backend.repository.monitoring


import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.annotation.JsonNaming

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class AiDetectionData(
    val memberId: String,
    val plyno: String,
    val dvcId: String,
    val tripId: String,
    val tripDistance: Int,
    val tripTime: Int,
    val dtctDt: String,
    val dtctHh: String,
    val lv_1_cnt: Int,
    val lv_2_cnt: Int,
    val stcd: String,
    val partDt: String,
)
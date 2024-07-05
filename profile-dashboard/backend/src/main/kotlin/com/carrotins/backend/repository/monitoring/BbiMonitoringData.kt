package com.carrotins.backend.repository.monitoring

import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.annotation.JsonNaming

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class BbiAbnormalData(
    val metric: String,
    val threshold: String,
    val unit: String,
    val timeOrDst: String,
    val value: Int,
    val total: Int,
    val partDt: String,
)

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class BbiDetectionData(
    val dvcId: String,
    val memId: String,
    val trpId: String,
    val day: String,
    val dayEn: String,
    val hour: Int,
    val nst: Int,
    val nac: Int,
    val ndc: Int,
    val nsp: Int,
    val sst: Int,
    val sac: Int,
    val sdc: Int,
    val ssp: Int,
    val traffic: Int,
    val totalBbi: Int,
    val partDt: String,
)

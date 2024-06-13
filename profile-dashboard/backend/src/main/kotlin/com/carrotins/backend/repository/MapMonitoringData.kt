package com.carrotins.backend.repository

import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.annotation.JsonNaming

/**
 * Created by alvin on 2024. 6. 13..
 */

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class Top100TableData(
    val bsDt: String,
    val dvcGb: String, // 제조사
    val dvcCount: Int,    // cnt
)


@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class BbiMapData(
    val bsDt: String,
    val dvcGb: String, // 제조사
    val dvcCount: Int,    // cnt
)
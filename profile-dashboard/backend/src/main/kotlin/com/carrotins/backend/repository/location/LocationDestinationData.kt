package com.carrotins.backend.repository.location

import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.annotation.JsonNaming

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class DestinationPersonalData(
    val memberId: String,
    val plyno: String,
    val dvcId: String,
    val partDt: String,
    val endH3: String,
)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class DestinationPersonalRankData(
    val memberId: String,
    val plyno: String,
    val dvcId: String,
    val endH3: String,
    val count: Int,
    val rank: Int,
)

//data class DestinationSegmentData(
//    val endH3: String,
//)

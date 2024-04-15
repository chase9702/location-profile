package com.carrotins.backend.repository.location

import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.annotation.JsonNaming
import com.uber.h3core.util.LatLng

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class DestinationPersonalData(
    val memberId: String,
    val plyno: String,
    val dvcId: String,
    val partDt: String,
    val endH3: String,
    val address: String,
)


@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class DestinationPersonalPeriodAddH3Data(
    val memberId: String,
    val plyno: String,
    val dvcId: String,
    val endH3: String,
    val count: Int,
    val rank: Int,
    val h3cell: String?,
    val address: String?,
)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class DestinationPersonalMonthlyData(
    val memberId: String,
    val endH3: String,
    val address: String,
    val count: Int,
    val rank: Int,
)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class DestinationPersonalMonthlyAddH3Data(
    val memberId: String,
    val endH3: String,
    val address: String,
    val h3cell: String?,
    val count: Int,
    val rank: Int,
)

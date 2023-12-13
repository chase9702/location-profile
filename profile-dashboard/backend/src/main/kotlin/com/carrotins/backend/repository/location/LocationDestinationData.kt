package com.carrotins.backend.repository.location

data class DestinationPersonalData(
    val memberId: String,
    val plyno: String,
    val dvcId: String,
    val partDt: String,
    val endH3: String,
//    val count: Int,
)

data class DestinationPersonalRankData(
    val memberId: String,
    val plyno: String,
    val dvcId: String,
    val endH3: String,
    val count: Int,
    val rank: Int,
)

data class DestinationGroupDataInfo (
    val test: String,
)
package com.carrotins.backend.repository

import java.math.BigDecimal

/**
 * Created by alvin on 2023/07/19.
 */
data class HiveDataTable(
    val dvcgb: String,
    val cnt01: Int,
)

data class CarprdName(
    val cr_prd_cmpcd_nm: String,
    var trip_rt: Double,
)

data class ZeroTripTable(
    val dvc_gb: String,
    val part_dt: String,
    val trip_total : Int,
    val trip_01: Int,
    val trip_98: Int,
    var trip_rt: Double=0.0,
)

data class Trip02Table(
    val dvc_gb: String,
    val part_dt: String,
    val trip_total : Int,
    val trip_01: Int,
    val trip_02: Int,
    var trip_rt: Double=0.0,
)


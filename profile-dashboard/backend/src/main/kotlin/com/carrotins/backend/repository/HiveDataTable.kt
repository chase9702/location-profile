package com.carrotins.backend.repository

import java.math.BigDecimal

/**
 * Created by alvin on 2023/07/19.
 */
data class HiveDataTable(
    val dvcgb: String,
    val cnt01: Int,
)

data class ZeroTripTable(
    val dvc_gb: String,
    val part_dt: String,
    val trip_98_rt: Double,
)

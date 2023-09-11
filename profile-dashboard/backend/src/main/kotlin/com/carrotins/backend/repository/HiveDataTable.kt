package com.carrotins.backend.repository

/**
 * Created by alvin on 2023/07/19.
 */
data class DeviceProductCount(
    val dvcgb: String, // 제조사
    val cnt01: Int,    // cnt
)

data class CarProductNameInfo(
    val cr_prd_cmpcd_nm: String, // 자동차 생산 회사명
    var trip_rt: Double,         // Zero GPS 비율
)

data class ZeroGpsTripInfo(
    val dvc_gb: String,      // 제조사
    val part_dt: String,     // 파티션 날짜
    val trip_total : Int,    // 01(정상) + 98(Zero GPS) 트립 수 합
    val trip_01: Int,        // 01(정상) 트립 수
    val trip_98: Int,        // 98(Zero GPS) 트립 수
    var trip_rt: Double=0.0, // Zero GPS 비율
)

data class InterpolationTripInfo(
    val dvc_gb: String,       // 제조사
    val part_dt: String,      // 파티션 날짜
    val trip_total : Int,     // 01(정상) + 98(보간) 트립 수 합
    val trip_01: Int,         // 01(정상) 트립 수
    val trip_02: Int,         // 02(보간) 트립 수
    var trip_rt: Double=0.0,  // 보간 트립 비율
)


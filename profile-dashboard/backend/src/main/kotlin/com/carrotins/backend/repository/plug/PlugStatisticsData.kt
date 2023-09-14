package com.carrotins.backend.repository.plug

/**
 * Created by alvin on 2023/07/19.
 */

data class DeviceProductCount(
    val dvcgb: String, // 제조사
    val cnt01: Int,    // cnt
)

data class CarProductNameInfo(
    val cr_prd_cmpcd_nm: String, // 자동차 생산 회사명
    val part_dt: String,     // 파티션 날짜
    val trip_total : Int,    // 01(정상) + 98(Zero GPS) 트립 수 합
    val trip_01: Int,        // 01(정상) 트립 수
    val trip_98: Int,        // 98(Zero GPS) 트립 수
    var trip_rt: Double=0.0, // Zero GPS 비율
)

data class ZeroGpsTripInfo(
    val dvc_gb: String,      // 제조사
    val part_dt: String,     // 파티션 날짜
    val trip_total : Int,    // 01(정상) + 98(Zero GPS) 트립 수 합
    val trip_01: Int,        // 01(정상) 트립 수
    val trip_98: Int,        // 98(Zero GPS) 트립 수
    var trip_rt: Double=0.0, // Zero GPS 비율
)

data class InterpolationTripDailyInfo(
    val dvc_gb: String,
    val dvc_mdl: String,
    val sd: String,
    val ctgry: String,
    val bs_dt: String,
    val divc_cnt: Int,
    val sum_total_dist: Int,
    val sum_01_dist: Int,
    val sum_02_dist: Int,
    val dist_02_rt: Double,
    val sum_total_trip_cnt: Int,
    val sum_01_trip_cnt: Int,
    val sum_02_trip_cnt: Int,
    val trip_rt: Double,
    val trip_cnt_1: Int,
    val trip_cnt_2: Int,
    val trip_cnt_3: Int,
    val trip_cnt_5: Int,
    val trip_cnt_7: Int,
    val trip_cnt_10: Int,
    val trip_cnt_10_over: Int,
)


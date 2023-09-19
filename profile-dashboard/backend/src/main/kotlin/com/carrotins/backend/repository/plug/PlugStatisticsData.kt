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

data class ZeroGpsTripDailyInfo(
    val bsDt: String,      // 제조사
    val dvcGb: String,     // 파티션 날짜
    val dvcMdl : String,    // 01(정상) + 98(Zero GPS) 트립 수 합
    val sumTotalTripCnt: Int,        // 01(정상) 트립 수
    val sumNormalTripCnt: Int,        // 98(Zero GPS) 트립 수
    var sumZeroTripCnt: Int,
    val sumZero360TripCnt: Int,
    val sumZero420TripCnt: Int,
    val sumZero480TripCnt: Int,
    val sumZero540TripCnt: Int,
    val sumZero600TripCnt: Int,
    val sumZero900TripCnt: Int,
    val sumZero1200TripCnt: Int,
    val sumZero1500TripCnt: Int,
    val sumZero1800TripCnt: Int,
    val sumZero1800OverTripCnt: Int,
)

data class InterpolationTrip(
    val DvcGb: String,      // 제조사
    val part_dt: String,     // 파티션 날짜
    val trip_total : Int,    // 01(정상) + 98(Zero GPS) 트립 수 합
    val trip_01: Int,        // 01(정상) 트립 수
    val trip_98: Int,        // 98(Zero GPS) 트립 수
    var trip_rt: Double=0.0, // Zero GPS 비율
)

data class ZeroGpsTripMonthlyInfo(
    val bsDt: String,      // 제조사
    val dvcGb: String,     // 파티션 날짜
    val dvcMdl : String,    // 01(정상) + 98(Zero GPS) 트립 수 합
    val sumTotalTripCnt: Int,        // 01(정상) 트립 수
    val sumNormalTripCnt: Int,        // 98(Zero GPS) 트립 수
    var sumZeroTripCnt: Int,
)

data class InterpolationTripMonthlyInfo(
    val dvcGb: String,
    val dvcMdl: String,
    val bsDt: String,
    val dvcCnt: Int,
    val sumTotalDist: Int,
    val sumNormalDist: Int,
    val sumInterpolationDist: Int,
    val distInterpolationRt: Double,
    val sumTotalTripCnt: Int,
    val sumNormalTripCnt: Int,
    val sumInterpolationTripCnt: Int,
    val sumInterpolationTripRt: Double,
)
data class InterpolationTripDailyInfo(
    val dvcGb: String,
    val dvcMdl: String,
    val bsDt: String,
    val dvcCnt: Int,
    val sumTotalDist: Int,
    val sumNormalDist: Int,
    val sumInterpolationDist: Int,
    val distInterpolationRt: Double,
    val sumTotalTripCnt: Int,
    val sumNormalTripCnt: Int,
    val sumInterpolationTripCnt: Int,
    val tripInterpolationRt: Double,
    val tripCnt1: Int,
    val tripCnt2: Int,
    val tripCnt3: Int,
    val tripCnt5: Int,
    val tripCnt7: Int,
    val tripCnt10: Int,
    val tripCnt10Over: Int,
)


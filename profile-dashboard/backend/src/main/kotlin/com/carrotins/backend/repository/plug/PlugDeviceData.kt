package com.carrotins.backend.repository.plug

import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.annotation.JsonNaming

/**
 * Created by alvin on 2023/09/13.
 */


@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class DeviceTop100Data(
    val dvcId: String, // 디바이스 id
    val plyNo: String, // 증권 번호
    val tripCnt: Int,  // 전체 트립 수
    val lagMean: Float,
    val lagStd: Float,
    val lagMin: Int,
    val lagMax: Int,
    val fixVldGpsElapsedTimeMean: Float,
    val fixVldGpsElapsedTimeStd: Float,
    val fixVldGpsElapsedTimeMin: Int,
    val fixVldGpsElapsedTimeMax: Int,
    val vldIdealCntSum: Int,
    val idealCntSum: Int,
    val rcvDataCntSum: Int,
    val invldGpsCntSum: Int,
    val rcvLagTimeSum: Int,
    val crPrdCmpcdNm :String, // 자동차 제조사 이름
    val zeroTripCnt: Int, // zero gps trip 수
    val zeroTripRatio: Float, // zero gps trip 비율
    val ver :String, // 펌웨어 버전
    val tpMean: Float,
    val tpStd: Float,
    val tpMin :Float,
    val tpMax :Float,
    val tpNullcnt: Int,
    val vxMean :Float,
    val vxStd :Float,
    val vxMin :Float,
    val vxMax :Float,
    val vxNullcnt: Int,
    val viMean :Float,
    val viStd :Float,
    val viMin :Float,
    val viMax :Float,
    val viNullcnt: Int,
    val rs0Cnt :Int,
    val rs1Cnt :Int,
    val rs2Cnt :Int,
    val rs3Cnt :Int,
    val ac0Cnt :Int,
    val ac1Cnt :Int,
    val ac2Cnt :Int,
    val ac3Cnt :Int,
    val ac5Cnt :Int,
    val ac7Cnt :Int,
    val ac9Cnt :Int,
    val ac14Cnt: Int,
    val ac19Cnt: Int,
    val ac24Cnt: Int,
    val ac29Cnt: Int,
    val ac39Cnt: Int,
    val ac59Cnt: Int,
    val ac69Cnt: Int,
    val ac99Cnt: Int,
    val ac100Cnt: Int,
    val invldGpsCntRatio: Float, // 비정상 gps비율
    val invldRcvLagTimeRatio :Float, // 서버 수신 지연시간 비율
    val partDt: String
)



@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class DeviceTripData(
    val plyNo: String, // 증권 번호
    val dvcId: String, // 디바이스 id
    val tripId: String, // 디바이스 id
    val ver :String, // 펌웨어 버전
    val lag : String,
    val rcvDataCnt: Int,
    val startTrCt: String,
    val endTrCt: String,
    val invldGpsCnt: Int,
    val rcvLagTime: Int,
    val tpMean: Float,
    val tpStd: Float,
    val tpMin :Float,
    val tpMax :Float,
    val tpNullcnt: Int,
    val vxMean :Float,
    val vxStd :Float,
    val vxMin :Float,
    val vxMax :Float,
    val vxNullcnt: Int,
    val viMean :Float,
    val viStd :Float,
    val viMin :Float,
    val viMax :Float,
    val viNullcnt: Int,
    val rs0Cnt :Int,
    val rs1Cnt :Int,
    val rs2Cnt :Int,
    val rs3Cnt :Int,
    val ac0Cnt :Int,
    val ac1Cnt :Int,
    val ac2Cnt :Int,
    val ac3Cnt :Int,
    val ac5Cnt :Int,
    val ac7Cnt :Int,
    val ac9Cnt :Int,
    val ac14Cnt: Int,
    val ac19Cnt: Int,
    val ac24Cnt: Int,
    val ac29Cnt: Int,
    val ac39Cnt: Int,
    val ac59Cnt: Int,
    val ac69Cnt: Int,
    val ac99Cnt: Int,
    val ac100Cnt: Int,
    val fixVldGpsElapsedTime: Int,
    val vldIdealCnt: Int,
    val idealCnt: Int,
    val invldGpsRatio: Float,
    val invldRcvLagTimeRatio :Float, // 서버 수신 지연시간 비율
    val tripGb: String,
    val crPrdCmpcdNm :String, // 자동차 제조사 이름
    val partDt: String
)
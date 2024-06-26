package com.carrotins.backend.repository.monitoring

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.annotation.JsonNaming
import org.codehaus.jackson.annotate.JsonCreator

/**
 * Created by alvin on 2024. 6. 13..
 */

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class Top100TableData(
    val partDt: String,
    val hour: String,
    val rank: Int,
    val addr: String,
    val addrCd: String,
    val behaviorValue: Int
)


@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class Top100BBIMapData(
    val partDt: String,
    val hour: String,
    val hex: String,
    val addr: String,
    val addrCd: String,
    val sst: Int,
    val sac: Int,
    val ssp: Int,
    val sdc: Int,
    val totalBbi: Int,
    val traffic: Int,
)

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class BBIMetaData(
    val hex: String,
    val hour: String,
    val partDt: String,
    val behavior: String,
    val tripId: String,
    val ct: Long?,
    val sp: Double?,
    val fs: Double?,
    val durt: Long?,
    val accel: Double?,
    val ac: Double?,
    val sa: Double?
)

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class Top100PublicMapData(
    val addr: String,         // 주소
    val addrCd: String,       // 주소 코드
    val hex: String,          // h3 10 인덱스
    val seriousCnt: Long,     // 중대 사고 발생 횟수
    val slightCnt: Long,      // 경미한 사고 발생 횟수
    val totalCnt: Long,       // 사고 총 발생 횟수

    val crossingCenterLineCnt: Int,
    val etcCnt: Int,
    @JsonProperty("il_u_turn_cnt") val ilUTurnCnt: Int,
    val intersectionCnt: Int,
    val laneCnt: Int,
    val lightCnt: Int,
    val obstructRightCnt: Int,
    val pedestrianCnt: Int,
    val safeDistanceCnt: Int,
    val safeDrivingCnt: Int,

    val crossingCenterLineRatio: Double,
    val etcRatio: Double,
    @JsonProperty("il_u_turn_ratio") val ilUTurnRatio: Double,
    val intersectionRatio: Double,
    val laneRatio: Double,
    val lightRatio: Double,
    val obstructRightRatio: Double,
    val pedestrianRatio: Double,
    val safeDistanceRatio: Double,
    val safeDrivingRatio: Double,
)

data class Top100AiMapData(
    val addr: String,
)
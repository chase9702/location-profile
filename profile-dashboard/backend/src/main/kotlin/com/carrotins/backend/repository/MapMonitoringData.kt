package com.carrotins.backend.repository

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
    val sstMeta: List<BBIMetaData>,
    val sacMeta: List<BBIMetaData>,
    val sspMeta: List<BBIMetaData>,
    val sdcMeta: List<BBIMetaData>,
)


data class BBIMetaData @JsonCreator constructor(
    @JsonProperty("trip_id") val tripId: String,
    @JsonProperty("ct") val ct: Long?,
    @JsonProperty("sp") val sp: Double?,
    @JsonProperty("fs") val fs: Double?,
    @JsonProperty("durt") val durt: Long?,
    @JsonProperty("accel") val accel: Double?,
    @JsonProperty("ac") val ac: Double?,
    @JsonProperty("sa") val sa: Double?
)

data class Top100PublicMapData(
    val addr: String,         // 주소
    val addrCd: String,       // 주소 코드
    val hex: String,          // h3 10 인덱스
    val seriousCnt: Long,     // 중대 사고 발생 횟수
    val slightCnt: Long,      // 경미한 사고 발생 횟수
    val totalCnt: Long,       // 사고 총 발생 횟수
    val violationCnt: Map<String, Int>, // 법규위반 별 발생 횟수
    val violationRatio: Map<String, Double> // 법규위반 별 발생 비율
)

data class Top100AiMapData(
    val addr: String,
)
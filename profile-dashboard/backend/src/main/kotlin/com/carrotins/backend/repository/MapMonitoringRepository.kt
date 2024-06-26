package com.carrotins.backend.repository

import com.carrotins.backend.repository.location.LocationAddressBoundaryData
import com.carrotins.backend.utils.transformNullToEmptyString
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.exc.MismatchedInputException
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

/**
 * Created by alvin on 2024. 6. 13..
 */
@Repository
class MapMonitoringRepository(
    private val hiveJdbcTemplate: JdbcTemplate


) {
    private val objectMapper = ObjectMapper()
    fun getTop100data(hour: String, date: String, behavior: String): List<Top100TableData> {

        val query: String = """
             SELECT 
                 part_dt, 
                 hour,
                 rank() OVER(PARTITION BY part_dt, hour ORDER BY $behavior desc) AS rank,
                 addr,
                 addr_cd,
                 $behavior as behavior_value
               FROM dw.swp_bbi_dong_hr
             WHERE 1=1
               AND part_dt = '$date'
               AND hour = '$hour'
               LIMIT 100
        """.trimIndent()

        return hiveJdbcTemplate.query(query) { rs, _ ->
            Top100TableData(
                partDt = transformNullToEmptyString(rs.getString("part_dt")),
                hour = transformNullToEmptyString(rs.getString("hour")),
                rank = rs.getInt("rank"),
                addr = transformNullToEmptyString(rs.getString("addr")),
                addrCd = transformNullToEmptyString(rs.getString("addr_cd")),
                behaviorValue = rs.getInt("behavior_value")
            )
        }
    }

    fun getBbiMapData(date: String, hour: String, addrCd: String): List<Top100BBIMapData> {

        val query = """
            SELECT *
            FROM dw.swp_bbi_hex_hr
            WHERE part_dt = ? AND hour = ? AND addr_cd = ?
            
        """.trimIndent()

        return hiveJdbcTemplate.query(query, arrayOf(date, hour, addrCd)) { rs, _ ->
            Top100BBIMapData(
                hex = rs.getString("hex"),
                hour = rs.getString("hour"),
                addr = rs.getString("addr"),
                addrCd = rs.getString("addr_cd"),
                sst = rs.getInt("sst"),
                sac = rs.getInt("sac"),
                ssp = rs.getInt("ssp"),
                sdc = rs.getInt("sdc"),
                totalBbi = rs.getInt("total_bbi"),
                traffic = rs.getInt("traffic"),
                sstMeta = parseMetaData(rs.getString("sst_meta")),
                sacMeta = parseMetaData(rs.getString("sac_meta")),
                sspMeta = parseMetaData(rs.getString("ssp_meta")),
                sdcMeta = parseMetaData(rs.getString("sdc_meta")),
                partDt = rs.getString("part_dt")
            )
        }
    }


    fun parseMetaData(jsonString: String?): List<BBIMetaData> {
        return if (jsonString != null) {
            objectMapper.readValue(jsonString)
        } else {
            emptyList()
        }
    }

    fun getPublicMapData(addrCd: String): List<Top100PublicMapData> {

        val query = """
            SELECT *
            FROM dw.public_clm_per_addr
            WHERE 1=1
             AND addr_cd = ?
""".trimIndent()

        return hiveJdbcTemplate.query(query, arrayOf(addrCd)) { rs, _ ->
            Top100PublicMapData(
                addr = rs.getString("addr"),
                addrCd = rs.getString("addr_cd"),
                hex = rs.getString("hex"),
                seriousCnt = rs.getLong("serious_cnt"),
                slightCnt = rs.getLong("slight_cnt"),
                totalCnt = rs.getLong("total_cnt"),
                crossingCenterLineCnt = rs.getInt("crossing_center_line_cnt"),
                etcCnt = rs.getInt("etc_cnt"),
                ilUTurnCnt = rs.getInt("il_u_turn_cnt"),
                intersectionCnt = rs.getInt("intersection_cnt"),
                laneCnt = rs.getInt("lane_cnt"),
                lightCnt= rs.getInt("light_cnt"),
                obstructRightCnt = rs.getInt("obstruct_right_cnt"),
                pedestrianCnt =rs.getInt("pedestrian_cnt"),
                safeDistanceCnt = rs.getInt("safe_distance_cnt"),
                safeDrivingCnt = rs.getInt("safe_driving_cnt"),
                crossingCenterLineRatio = rs.getDouble("crossing_center_line_ratio"),
                etcRatio = rs.getDouble("etc_ratio"),
                ilUTurnRatio = rs.getDouble("il_u_turn_ratio"),
                intersectionRatio = rs.getDouble("intersection_ratio"),
                laneRatio = rs.getDouble("lane_ratio"),
                lightRatio = rs.getDouble("light_ratio"),
                obstructRightRatio = rs.getDouble("obstruct_right_ratio"),
                pedestrianRatio = rs.getDouble("pedestrian_ratio"),
                safeDistanceRatio = rs.getDouble("safe_distance_ratio"),
                safeDrivingRatio = rs.getDouble("safe_driving_ratio"),
            )
        }
    }


    fun getAiMapData(addrCd: String, hour: String, date: String): List<Top100AiMapData> {


        return listOf()
    }


}
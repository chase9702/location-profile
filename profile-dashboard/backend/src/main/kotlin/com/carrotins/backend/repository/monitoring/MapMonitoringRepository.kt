package com.carrotins.backend.repository.monitoring

import com.carrotins.backend.utils.transformNullToEmptyString
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.ResultSet

/**
 * Created by alvin on 2024. 6. 13..
 */
@Repository
class MapMonitoringRepository(
    private val hiveJdbcTemplate: JdbcTemplate,
) {
    fun mapRowToTop100TableData(rs: ResultSet): Top100TableData =
        Top100TableData(
            partDt = transformNullToEmptyString(rs.getString("part_dt")),
            startDate = transformNullToEmptyString(rs.getString("start_date")),
            endDate = transformNullToEmptyString(rs.getString("end_date")),
            hour = transformNullToEmptyString(rs.getString("hour")),
            rank = rs.getInt("rank"),
            addr = transformNullToEmptyString(rs.getString("addr")),
            addrCd = transformNullToEmptyString(rs.getString("addr_cd")),
            behaviorValue = rs.getInt("behavior_value"),
        )

    fun mapRowToTop100BBIMapData(rs: ResultSet): Top100BBIMapData =
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
            partDt = rs.getString("part_dt"),
        )

    fun mapRowToBBIMetaData(rs: ResultSet): BBIMetaData =
        BBIMetaData(
            hex = rs.getString("hex"),
            hour = rs.getString("hour"),
            partDt = rs.getString("part_dt"),
            behavior = rs.getString("behavior"),
            tripId = rs.getString("trip_id"),
            ct = rs.getLong("ct"),
            sp = rs.getDouble("sp"),
            fs = rs.getDouble("fs"),
            durt = rs.getLong("durt"),
            accel = rs.getDouble("accel"),
            ac = rs.getDouble("ac"),
            sa = rs.getDouble("sa"),
        )

    fun getTop100dataByHour(
        hour: String,
        behavior: String,
        startDate: String?,
        endDate: String?,
    ): List<Top100TableData> {
        var query: String
        if (startDate.equals(endDate)) { // 시간 포함 하루만 조회
            query =
                """
                SELECT 
                    part_dt, 
                    hour,
                    '$startDate' as start_date,
                    '$endDate' as end_date,
                    rank() OVER(PARTITION BY part_dt, hour ORDER BY $behavior desc) AS rank,
                    addr,
                    addr_cd,
                    $behavior as behavior_value
                  FROM dw.swp_bbi_dong_hr
                WHERE 1=1
                  AND part_dt = '$startDate'
                  AND hour = '$hour'
                  LIMIT 100
                """.trimIndent()
        } else { // 시간 포함 기간 조회

            query =
                """
                SELECT 
                    'period' as part_dt,
                    '$hour' as hour,
                    '$startDate' as start_date,
                    '$endDate' as end_date,
                    '0' as rank,
                    addr,
                    addr_cd,
                    behavior_value
                FROM   
                  (SELECT  addr, addr_cd,
                        sum($behavior) as behavior_value
                  FROM dw.swp_bbi_dong_hr
                  WHERE 1=1
                  AND part_dt between '$startDate' and '$endDate'
                  AND hour = '$hour'
                  GROUP BY addr, addr_cd
                ) as a 
                ORDER BY behavior_value desc
                LIMIT 100
                """.trimIndent()
        }

        return hiveJdbcTemplate.query(query) { rs, _ -> mapRowToTop100TableData(rs) }
    }

    fun getTop100dataByDay(
        behavior: String,
        startDate: String?,
        endDate: String?,
    ): List<Top100TableData> {
        var query: String

        if (startDate.equals(endDate)) { // 하루만 조회
            query =
                """
                SELECT 
                    part_dt, 
                    'all' as hour,
                    '$startDate' as start_date,
                    '$endDate' as end_date,
                    rank() OVER(PARTITION BY part_dt ORDER BY $behavior desc) AS rank,
                    addr,
                    addr_cd,
                    $behavior as behavior_value
                  FROM dw.swp_bbi_dong_hr
                WHERE 1=1
                  AND part_dt = '$startDate'
                  LIMIT 100
                """.trimIndent()
        } else { // 기간 조회
            query =
                """
                SELECT 
                    'period' as part_dt,
                    'all' as hour,
                    '$startDate' as start_date,
                    '$endDate' as end_date,
                    '0' as rank,
                    addr,
                    addr_cd,
                    behavior_value
                FROM   
                  (SELECT  addr, addr_cd,
                        sum($behavior) as behavior_value
                  FROM dw.swp_bbi_dong_dyb
                  WHERE 1=1
                  AND part_dt between '$startDate' and '$endDate'
                  GROUP BY addr, addr_cd
                ) as a 
                ORDER BY behavior_value desc
                LIMIT 100
                """.trimIndent()
        }
        return hiveJdbcTemplate.query(query) { rs, _ -> mapRowToTop100TableData(rs) }
    }

    fun getBbiMapDataByHour(
        hour: String,
        addrCd: String,
        startDate: String,
        endDate: String,
    ): List<Top100BBIMapData> {
        var query: String

        if (startDate == endDate) {
            query =
                """
                SELECT *
                FROM dw.swp_bbi_hex_hr
                WHERE 1=1
                AND part_dt = '$startDate' 
                AND total_bbi > 0
                AND hour = '$hour' 
                AND addr_cd = '$addrCd'
                
                """.trimIndent()
        } else {
            query =
                """
                SELECT hex,
                    '$hour' as hour,
                    addr,
                    addr_cd,
                    sum(sst) as sst,
                    sum(sac) as sac,
                    sum(sdc) as sdc,
                    sum(ssp) as ssp,
                    sum(total_bbi) as total_bbi,
                    sum(traffic) as traffic,
                    part_dt
                FROM dw.swp_bbi_hex_hr
                WHERE 1=1
                AND part_dt between '$startDate' and '$endDate'
                AND hour = '$hour' 
                AND total_bbi > 0
                AND addr_cd = '$addrCd'
                GROUP BY hex, part_dt, addr, addr_cd, hour
                
                """.trimIndent()
        }

        return hiveJdbcTemplate.query(query) { rs, _ -> mapRowToTop100BBIMapData(rs) }
    }

    fun getBbiMapDataByDay(
        addrCd: String,
        startDate: String,
        endDate: String,
    ): List<Top100BBIMapData> {
        var query: String
        if (startDate == endDate) {
            query =
                """
                SELECT hex,
                    'all' as hour,
                    addr,
                    addr_cd,
                    sum(sst) as sst,
                    sum(sac) as sac,
                    sum(sdc) as sdc,
                    sum(ssp) as ssp,
                    sum(total_bbi) as total_bbi,
                    sum(traffic) as traffic,
                    part_dt
                FROM dw.swp_bbi_hex_hr
                WHERE 1=1
                AND part_dt = '$startDate'
                AND total_bbi > 0
                AND addr_cd = '$addrCd'
                GROUP BY hex, part_dt, addr, addr_cd
                
                """.trimIndent()
        } else {
            query =
                """
                SELECT hex,
                    'all' as hour,
                    addr,
                    addr_cd,
                    sum(sst) as sst,
                    sum(sac) as sac,
                    sum(sdc) as sdc,
                    sum(ssp) as ssp,
                    sum(total_bbi) as total_bbi,
                    sum(traffic) as traffic,
                    part_dt
                FROM dw.swp_bbi_hex_hr
                WHERE 1=1
                AND part_dt between '$startDate' and '$endDate'
                AND total_bbi > 0
                AND addr_cd = '$addrCd'
                GROUP BY hex, part_dt, addr, addr_cd
                
                """.trimIndent()
        }

        return hiveJdbcTemplate.query(query) { rs, _ -> mapRowToTop100BBIMapData(rs) }
    }

    fun getPublicMapData(addrCd: String): List<Top100PublicMapData> {
        val query =
            """
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
                lightCnt = rs.getInt("light_cnt"),
                obstructRightCnt = rs.getInt("obstruct_right_cnt"),
                pedestrianCnt = rs.getInt("pedestrian_cnt"),
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

    fun getAiMapData(
        addrCd: String,
        hour: String,
        date: String,
    ): List<Top100AiMapData> = listOf()

    fun getBbiMapMetaDataByHour(
        hex: String,
        hour: String?,
        startDate: String,
        endDate: String,
    ): List<BBIMetaData> {
        var query: String
        if (startDate == endDate) {
            query =
                """
                SELECT *
                FROM dw.meta_hex_hr
                 WHERE 1=1
                 AND part_dt = '$startDate' 
                 AND hour = '$hour' 
                 AND hex = '$hex'
                
                """.trimIndent()
        } else {
            query =
                """
                SELECT *
                FROM dw.meta_hex_hr
                WHERE 1=1
                AND part_dt between '$startDate' and '$endDate'
                AND hour = '$hour' 
                AND hex = '$hex'
                ORDER BY hour asc
                """.trimIndent()
        }
        return hiveJdbcTemplate.query(query) { rs, _ -> mapRowToBBIMetaData(rs) }
    }

    fun getBbiMapMetaDataByDay(
        hex: String,
        startDate: String,
        endDate: String,
    ): List<BBIMetaData> {
        var query: String
        if (startDate == endDate) {
            query =
                """
                SELECT *
                FROM dw.meta_hex_hr
                 WHERE 1=1
                 AND part_dt = '$startDate' 
                 AND hex = '$hex'
                
                """.trimIndent()
        } else {
            query =
                """
                SELECT *
                FROM dw.meta_hex_hr
                WHERE 1=1
                AND part_dt between '$startDate' and '$endDate'
                AND hex = '$hex'
                ORDER BY hour asc
                """.trimIndent()
        }
        return hiveJdbcTemplate.query(query) { rs, _ -> mapRowToBBIMetaData(rs) }
    }
}

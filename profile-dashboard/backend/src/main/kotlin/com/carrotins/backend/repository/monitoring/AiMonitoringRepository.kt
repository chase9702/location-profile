package com.carrotins.backend.repository.monitoring

import com.carrotins.backend.utils.transformNullToEmptyString
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class AiMonitoringRepository(
    private val hiveJdbcTemplate: JdbcTemplate
) {
    fun getAiDetectionTripData(): List<AiDetectionData> {
        val query: String = """
             SELECT 
                  member_id,
                  plyno,
                  dvc_id,
                  trip_id,
                  trip_distance,
                  trip_time,
                  dtct_dt,
                  dtct_hh,
                  lv_1_cnt,
                  lv_2_cnt,
                  stcd,
                  part_dt
               FROM dw.ai_dtct_stats_raw
             WHERE 1=1
        """.trimIndent()

        return hiveJdbcTemplate.query(query) { rs, _ ->
            AiDetectionData(
                memberId = transformNullToEmptyString(rs.getString("member_id")),
                plyno = transformNullToEmptyString(rs.getString("plyno")),
                dvcId = transformNullToEmptyString(rs.getString("dvc_id")),
                tripId = transformNullToEmptyString(rs.getString("trip_id")),
                tripDistance = rs.getInt("trip_distance"),
                tripTime = rs.getInt("trip_time"),
                dtctDt = transformNullToEmptyString(rs.getString("dtct_dt")),
                dtctHh = transformNullToEmptyString(rs.getString("dtct_hh")),
                lv_1_cnt = rs.getInt("lv_1_cnt"),
                lv_2_cnt = rs.getInt("lv_2_cnt"),
                stcd = transformNullToEmptyString(rs.getString("stcd")),
                partDt = transformNullToEmptyString(rs.getString("part_dt")),
            )
        }
    }

    fun getAiDetectionMemberData(): List<AiDetectionData> {
        val query: String = """
             SELECT 
                  member_id,
                  plyno,
                  dvc_id,
                  trip_id,
                  trip_distance,
                  trip_time,
                  dtct_dt,
                  dtct_hh,
                  lv_1_cnt,
                  lv_2_cnt,
                  stcd,
                  part_dt
               FROM dw.ai_dtct_stats_raw
              WHERE 1=1
              GROUP BY member_id
        """.trimIndent()

        return hiveJdbcTemplate.query(query) { rs, _ ->
            AiDetectionData(
                memberId = transformNullToEmptyString(rs.getString("member_id")),
                plyno = transformNullToEmptyString(rs.getString("plyno")),
                dvcId = transformNullToEmptyString(rs.getString("dvc_id")),
                tripId = transformNullToEmptyString(rs.getString("trip_id")),
                tripDistance = rs.getInt("trip_distance"),
                tripTime = rs.getInt("trip_time"),
                dtctDt = transformNullToEmptyString(rs.getString("dtct_dt")),
                dtctHh = transformNullToEmptyString(rs.getString("dtct_hh")),
                lv_1_cnt = rs.getInt("lv_1_cnt"),
                lv_2_cnt = rs.getInt("lv_2_cnt"),
                stcd = transformNullToEmptyString(rs.getString("stcd")),
                partDt = transformNullToEmptyString(rs.getString("part_dt")),
            )
        }
    }
}
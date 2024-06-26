package com.carrotins.backend.repository.monitoring

import com.carrotins.backend.utils.transformNullToEmptyString
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class AiMonitoringRepository(
    private val hiveJdbcTemplate: JdbcTemplate
) {
    fun getAiDetectionTripData(queryParams: String): List<AiDetectionData> {
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
                AND $queryParams

        """.trimIndent()
        return executeBbiDetectionQuery(query)
    }

    fun getAiDetectionMemberData(queryParams: String): List<AiDetectionData> {
        val query: String = """
             select member_id
                 , max(plyno) as plyno
                 , max(dvc_id) as dvc_id
                 , max(trip_id) as trip_id
                 , sum(trip_distance) as trip_distance
                 , sum(trip_time) as trip_time
                 , max(dtct_dt) as dtct_dt
                 , max(dtct_hh) as dtct_hh
                 , sum(lv_1_cnt) as lv_1_cnt
                 , sum(lv_2_cnt) as lv_2_cnt
                 , max(stcd) as stcd
                 , part_dt
             from dw.ai_dtct_stats_raw
            where 1=1
              and $queryParams
            group by member_id, part_dt
        """.trimIndent()

        return executeBbiDetectionQuery(query)
    }

    fun getAiDetectionDeviceIdData(queryParams: String): List<AiDetectionData> {
        val query: String = """
             select max(member_id) as member_id
                 , max(plyno) as plyno
                 , dvc_id
                 , max(trip_id) as trip_id
                 , sum(trip_distance) as trip_distance
                 , sum(trip_time) as trip_time
                 , max(dtct_dt) as dtct_dt
                 , max(dtct_hh) as dtct_hh
                 , sum(lv_1_cnt) as lv_1_cnt
                 , sum(lv_2_cnt) as lv_2_cnt
                 , max(stcd) as stcd
                 , part_dt
             from dw.ai_dtct_stats_raw
              where 1=1
              and $queryParams
              group by dvc_id, part_dt
        """.trimIndent()

        return executeBbiDetectionQuery(query)
    }

    fun executeBbiDetectionQuery(query: String): List<AiDetectionData> {
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
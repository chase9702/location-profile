package com.carrotins.backend.repository.monitoring

import com.carrotins.backend.utils.transformNullToEmptyString
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class BbiMonitoringRepository(
    private val hiveJdbcTemplate: JdbcTemplate
) {
    fun getBbiAbnormalData(queryParams: String): List<BbiAbnormalData> {
        val query: String = """
             SELECT 
                  metric,
                  threshold,
                  unit,
                  value,
                  part_dt
               FROM dw.swp_abn_summary
              WHERE 1=1
                AND metric <> 'frow'
                AND $queryParams

        """.trimIndent()

        return hiveJdbcTemplate.query(query) { rs, _ ->
            BbiAbnormalData(
                metric = transformNullToEmptyString(rs.getString("metric")),
                threshold = transformNullToEmptyString(rs.getString("threshold")),
                unit = transformNullToEmptyString(rs.getString("unit")),
                value = rs.getDouble("value"),
                partDt = transformNullToEmptyString(rs.getString("part_dt")),
            )
        }
    }

    fun getBbiDetectionDeviceIdData(queryParams: String): List<BbiDetectionData> {
        val query: String = """
           SELECT 
             dvc_id as dvc_id,
             max(mem_id) as mem_id,
             max(trp_id) as trp_id,
             max(day) as day,
             max(day_en) as day_en,
             sum(hour) as hour,
             sum(nst) as nst,
             sum(nac) as nac,
             sum(ndc) as ndc,
             sum(nsp) as nsp,
             sum(sst) as sst,
             sum(sac) as sac,
             sum(sdc) as sdc,
             sum(ssp) as ssp,
             sum(traffic) as traffic,
             sum(total_bbi) as total_bbi,
             part_dt
          FROM dw.bbi_detection
         WHERE 1=1
           AND $queryParams
         GROUP BY dvc_id, part_dt
    """.trimIndent()

        return executeBbiDetectionQuery(query)
    }

    fun getBbiDetectionMemberData(queryParams: String): List<BbiDetectionData> {
        val query: String = """
         SELECT 
             max(dvc_id) as dvc_id,
             mem_id,
             max(trp_id) as trp_id,
             max(day) as day,
             max(day_en) as day_en,
             sum(hour) as hour,
             sum(nst) as nst,
             sum(nac) as nac,
             sum(ndc) as ndc,
             sum(nsp) as nsp,
             sum(sst) as sst,
             sum(sac) as sac,
             sum(sdc) as sdc,
             sum(ssp) as ssp,
             sum(traffic) as traffic,
             sum(total_bbi) as total_bbi,
             part_dt
          FROM dw.bbi_detection
         WHERE 1=1
           AND $queryParams
         GROUP BY mem_id, part_dt
    """.trimIndent()

        return executeBbiDetectionQuery(query)
    }

    fun getBbiDetectionTripData(queryParams: String): List<BbiDetectionData> {
        val query: String = """
         SELECT 
              dvc_id,
              mem_id,
              trp_id,
              day,
              day_en,
              hour,
              nst,
              nac,
              ndc,
              nsp,
              sst,
              sac,
              sdc,
              ssp,
              traffic,
              total_bbi,
              part_dt
           FROM dw.bbi_detection
          WHERE 1=1
            AND $queryParams
    """.trimIndent()

        return executeBbiDetectionQuery(query)
    }

    fun executeBbiDetectionQuery(query: String): List<BbiDetectionData> {
        return hiveJdbcTemplate.query(query) { rs, _ ->
            BbiDetectionData(
                dvcId = transformNullToEmptyString(rs.getString("dvc_id")),
                memId = transformNullToEmptyString(rs.getString("mem_id")),
                trpId = transformNullToEmptyString(rs.getString("trp_id")),
                day = transformNullToEmptyString(rs.getString("day")),
                dayEn = transformNullToEmptyString(rs.getString("day_en")),
                hour = rs.getInt("hour"),
                nst = rs.getInt("nst"),
                nac = rs.getInt("nac"),
                ndc = rs.getInt("ndc"),
                nsp = rs.getInt("nsp"),
                sst = rs.getInt("sst"),
                sac = rs.getInt("sac"),
                sdc = rs.getInt("sdc"),
                ssp = rs.getInt("ssp"),
                traffic = rs.getInt("traffic"),
                totalBbi = rs.getInt("total_bbi"),
                partDt = transformNullToEmptyString(rs.getString("part_dt")),
            )
        }
    }
}
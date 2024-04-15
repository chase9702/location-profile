package com.carrotins.backend.repository.location

import com.carrotins.backend.utils.transformNullToEmptyString
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class LocationDestinationRepository(
    private val hiveJdbcTemplate: JdbcTemplate
) {
    fun getDestinationPersonalPeriodData(queryParams: String): List<DestinationPersonalData> {
        val query: String = """
             SELECT 
                 member_id,
                 plyno,
                 dvc_id,
                 part_dt,
                 end_h3,
                 end_address
               FROM dw.li_od_trip
             WHERE 1=1
               AND $queryParams
        """.trimIndent()

        return hiveJdbcTemplate.query(query) { rs, _ ->
            DestinationPersonalData(
                memberId = transformNullToEmptyString(rs.getString("member_id")),
                plyno = transformNullToEmptyString(rs.getString("plyno")),
                dvcId = transformNullToEmptyString(rs.getString("dvc_id")),
                partDt = transformNullToEmptyString(rs.getString("part_dt")),
                endH3 = transformNullToEmptyString(rs.getString("end_h3")),
                address = transformNullToEmptyString(rs.getString("end_address")),
            )
        }
    }

    //    segment 레파지토리여서 월별 마트 만들어지면 쿼리 수정해야함.
    fun getDestinationPersonalMonthlyData(queryParams: String): List<DestinationPersonalMonthlyData> {
        val query: String = """
             SELECT 
                 member_id,
                 end_h3,
                 end_address,
                 cnt,
                 rank
               FROM dw.li_od_mthy
             WHERE 1=1
               AND $queryParams
               --group by member_id
               --         ,plyno
               --         ,dvc_id
               --         ,part_dt
               --         ,end_h3
        """.trimIndent()

        return hiveJdbcTemplate.query(query) { rs, _ ->
            DestinationPersonalMonthlyData(
                memberId = transformNullToEmptyString(rs.getString("member_id")),
                endH3 = transformNullToEmptyString(rs.getString("end_h3")),
                address = transformNullToEmptyString(rs.getString("end_address")),
                count = rs.getInt("cnt"),
                rank = rs.getInt("rank"),
            )
        }
    }
}
package com.carrotins.backend.repository

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

/**
 * Created by alvin on 2023/07/19.
 */
@Repository
class HiveTestRepository(
    private val hiveJdbcTemplate: JdbcTemplate
) {
    fun get01trip(

    ): List<HiveDataTable> {
        val query: String = """
             SELECT 
                 dvc_gb,
                 01_trip_cnt
               FROM `dw`.`li_plug_profile_100`
        """.trimIndent()

        return hiveJdbcTemplate.query(query){ rs, _ ->
            HiveDataTable(
                dvcgb = rs.getString("dvc_gb"),
                cnt01 = rs.getInt("01_trip_cnt"),
            )
        }
    }

    fun get02rt(

    ): List<ZeroTripTable> {
        val query: String = """
             SELECT 
                 dvc_gb,
                 part_dt,
                 (98_trip_cnt / (01_trip_cnt + 98_trip_cnt)) as 98_trip_cnt
               FROM `dw`.`li_plug_profile_100`
        """.trimIndent()

        return hiveJdbcTemplate.query(query){ rs, _ ->
            ZeroTripTable(
                dvc_gb = rs.getString("dvc_gb"),
                part_dt = rs.getString("part_dt"),
                trip_98_rt = rs.getDouble("98_trip_cnt"),
            )
        }
    }

    fun getTestData2(

    ): List<HiveDataTable> {
        val query: String = """
             SELECT 
                 dvc_gb,
                 01_trip_cnt
             FROM `dmp`.`cus_mstr`
             WHERE 1=1 
             LIMIT 100
        """.trimIndent()

        return hiveJdbcTemplate.query(query){ rs, _ ->
            HiveDataTable(
                dvcgb = rs.getString("dvc_gb"),
                cnt01 = rs.getInt("01_trip_cnt"),
            )
        }
    }
}
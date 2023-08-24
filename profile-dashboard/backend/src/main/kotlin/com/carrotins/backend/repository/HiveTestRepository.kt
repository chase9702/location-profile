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
    fun getTestData(

    ): List<HiveDataTable> {
        val query: String = """
             SELECT 
                 divc_no,
                 dvc_gb
             FROM `dw`.`li_plug_profile_100`
             WHERE 1=1
             LIMIT 100
        """.trimIndent()

        return hiveJdbcTemplate.query(query){ rs, _ ->
            HiveDataTable(
                col = rs.getString("divc_no"),
                type = rs.getString("dvc_gb"),
            )
        }
    }

    fun getTestData2(

    ): List<HiveDataTable> {
        val query: String = """
             SELECT 
                 ctmno,
                 ctm_dscno
             FROM `dmp`.`cus_mstr`
             WHERE 1=1 
             LIMIT 100
        """.trimIndent()

        return hiveJdbcTemplate.query(query){ rs, _ ->
            HiveDataTable(
                col = rs.getString("a"),
                type = rs.getString("b"),
            )
        }
    }
}
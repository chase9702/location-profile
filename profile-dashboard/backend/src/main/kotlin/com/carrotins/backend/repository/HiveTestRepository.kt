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
                 a,
                 b
             FROM `tmp`.`test_tb_01`
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
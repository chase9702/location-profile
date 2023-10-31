package com.carrotins.backend.repository

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import com.carrotins.backend.utils.transformNullToEmptyString


/**
 * Created by alvin on 2023/09/18.
 */
@Repository
class HomeRepository(
    private val hiveJdbcTemplate: JdbcTemplate
) {
    fun getHomeDeviceInfo() : List<HomeDeviceInfo> {
        val query: String = """
             SELECT 
                 bs_dt,
                 dvc_gb,
                 divc_no_cnt
               FROM dw.li_plug_divc_cnt_rslt
               ORDER BY bs_dt


        """.trimIndent()
        return hiveJdbcTemplate.query(query) { rs, _ ->
            HomeDeviceInfo(
                bsDt = transformNullToEmptyString(rs.getString("bs_dt")),
                dvcGb = transformNullToEmptyString(rs.getString("dvc_gb")),
                dvcCount = rs.getInt("divc_no_cnt"),
            )
        }
    }
}
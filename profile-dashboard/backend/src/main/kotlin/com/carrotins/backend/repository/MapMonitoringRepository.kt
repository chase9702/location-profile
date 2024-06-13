package com.carrotins.backend.repository

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

/**
 * Created by alvin on 2024. 6. 13..
 */
@Repository
class MapMonitoringRepository(
    private val hiveJdbcTemplate: JdbcTemplate
) {
    fun getTop100data(hour: String?, date: String?): List<Top100TableData> {



        return emptyList()
    }

    fun getBbiMapData(address: String?): List<BbiMapData> {


        return emptyList()
    }

}
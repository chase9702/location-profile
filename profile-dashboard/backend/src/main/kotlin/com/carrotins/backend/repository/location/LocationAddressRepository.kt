package com.carrotins.backend.repository.location

import com.carrotins.backend.utils.transformNullToEmptyString
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class LocationAddressRepository (
    private val hiveJdbcTemplate: JdbcTemplate

){
    fun getAddressData(requestParam: String) : List<LocationAddressData> {
        val query: String = """
             SELECT 
                 address,
                 h3,
                 geometry
               FROM dw.li_od_trip_test
             WHERE 1=1
               AND $requestParam
        """.trimIndent()

        return hiveJdbcTemplate.query(query) { rs, _ ->
            LocationAddressData(
                address = transformNullToEmptyString(rs.getString("address")),
                h3 = transformNullToEmptyString(rs.getString("h3")),
                geometry = transformNullToEmptyString(rs.getString("geometry")),
            )
        }
    }
}
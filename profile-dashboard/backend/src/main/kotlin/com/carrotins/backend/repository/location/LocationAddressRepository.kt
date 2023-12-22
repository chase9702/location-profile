package com.carrotins.backend.repository.location

import com.carrotins.backend.utils.transformNullToEmptyString
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class LocationAddressRepository (
    private val hiveJdbcTemplate: JdbcTemplate

){
    fun getAddressData(requestParam: String) : List<LocationAddressBoundaryData> {
        val query: String = """
             SELECT 
                 address,
                 h3_geometry as h3,
                 sd
               FROM dw.li_geo_boundary
             WHERE 1=1
               AND $requestParam
        """.trimIndent()

        return hiveJdbcTemplate.query(query) { rs, _ ->
            LocationAddressBoundaryData(
                address = transformNullToEmptyString(rs.getString("address")),
                h3 = transformNullToEmptyString(rs.getString("h3")),
                sd = transformNullToEmptyString(rs.getString("sd")),
            )
        }
    }
}
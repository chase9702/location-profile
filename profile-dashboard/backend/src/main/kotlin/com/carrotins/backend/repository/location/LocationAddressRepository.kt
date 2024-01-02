package com.carrotins.backend.repository.location

import com.carrotins.backend.utils.transformNullToEmptyString
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class LocationAddressRepository(
    private val hiveJdbcTemplate: JdbcTemplate

) {
    fun getBoundaryAddressData(sd: String): List<LocationAddressBoundaryData> {
        val query: String = """
             SELECT 
                 address,
                 h3_geometry as h3,
                 sd
               FROM dw.li_geo_boundary
             WHERE 1=1
               AND sd='$sd' 
        """.trimIndent()

        return hiveJdbcTemplate.query(query) { rs, _ ->
            LocationAddressBoundaryData(
                address = transformNullToEmptyString(rs.getString("address")),
                h3 = transformNullToEmptyString(rs.getString("h3")),
                sd = transformNullToEmptyString(rs.getString("sd")),
            )
        }
    }

    fun getH3AddressData(queryParam: String): List<LocationAddressH3Data> {
        val query: String = """
             SELECT 
                 address,
                 h3_geometry as h3
               FROM dw.li_h3_to_address
             WHERE 1=1
               AND $queryParam
        """.trimIndent()

        return hiveJdbcTemplate.query(query) { rs, _ ->
            LocationAddressH3Data(
                h3 = transformNullToEmptyString(rs.getString("h3")),
                address = transformNullToEmptyString(rs.getString("address")),
            )
        }
    }
}
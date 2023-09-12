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
    fun getDeviceProductCountData(): List<DeviceProductCount> {
        val query: String = """
             SELECT 
                 dvc_gb,
                 case when 01_trip_cnt is null then 0 else 01_trip_cnt end as 01_trip_cnt
               FROM `dw`.`li_plug_profile_100`
              -- where part_dt = '20230818'
               limit 100
        """.trimIndent()

        return hiveJdbcTemplate.query(query){ rs, _ ->
            DeviceProductCount(
                dvcgb = rs.getString("dvc_gb"),
                cnt01 = rs.getInt("01_trip_cnt"),
            )
        }
    }

    fun getCarProductNameInfoData(): List<CarProductNameInfo> {
        val query: String = """
             SELECT 
                 cr_prd_cmpcd_nm,
                 part_dt,
                 nvl(01_trip_cnt,0) + nvl(98_trip_cnt,0) as total_trip,
                 nvl(01_trip_cnt,0) as 01_trip_cnt,
                 nvl(98_trip_cnt,0) as 98_trip_cnt
                 FROM `dw`.`li_plug_profile_100`
              --WHERE part_dt >= '20230821'
                --AND part_dt <= '20230823'
        """.trimIndent()

        return hiveJdbcTemplate.query(query){ rs, _ ->
            CarProductNameInfo(
                cr_prd_cmpcd_nm = rs.getString("cr_prd_cmpcd_nm"),
                part_dt = rs.getString("part_dt"),
                trip_total = rs.getInt("total_trip"),
                trip_01 = rs.getInt("01_trip_cnt"),
                trip_98 = rs.getInt("98_trip_cnt"),                )
        }
    }

    fun getZeroGpsTripInfoData(): List<ZeroGpsTripInfo> {
        val query: String = """
             SELECT 
                 dvc_gb,
                 part_dt,
                 nvl(01_trip_cnt,0) + nvl(98_trip_cnt,0) as total_trip,
                 nvl(01_trip_cnt,0) as 01_trip_cnt,
                 nvl(98_trip_cnt,0) as 98_trip_cnt
               FROM `dw`.`li_plug_profile_100`
              --WHERE part_dt >= '20230821'
                --AND part_dt <= '20230823'

        """.trimIndent()

        hiveJdbcTemplate.fetchSize = 100000

        return hiveJdbcTemplate.query(query){ rs, _ ->
            ZeroGpsTripInfo(
                dvc_gb = rs.getString("dvc_gb"),
                part_dt = rs.getString("part_dt"),
                trip_total = rs.getInt("total_trip"),
                trip_01 = rs.getInt("01_trip_cnt"),
                trip_98 = rs.getInt("98_trip_cnt"),
            )
        }
    }

    fun getInterpolationTripInfoData(): List<InterpolationTripInfo> {
        val query: String = """
             SELECT 
                 dvc_gb,
                 part_dt,
                 nvl(01_trip_cnt,0) + nvl(02_trip_cnt,0) as total_trip,
                 nvl(01_trip_cnt,0) as 01_trip_cnt,
                 nvl(02_trip_cnt,0) as 02_trip_cnt
               FROM `dw`.`li_plug_profile_100`
              --WHERE part_dt >= '20230821'
                --AND part_dt <= '20230823'
        """.trimIndent()

        hiveJdbcTemplate.fetchSize = 100000

        return hiveJdbcTemplate.query(query){ rs, _ ->
            InterpolationTripInfo(
                dvc_gb = rs.getString("dvc_gb"),
                part_dt = rs.getString("part_dt"),
                trip_total = rs.getInt("total_trip"),
                trip_01 = rs.getInt("01_trip_cnt"),
                trip_02 = rs.getInt("02_trip_cnt"),
            )
        }
    }
}
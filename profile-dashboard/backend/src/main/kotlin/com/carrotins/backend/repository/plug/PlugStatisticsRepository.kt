package com.carrotins.backend.repository.plug

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

/**
 * Created by alvin on 2023/07/19.
 */
@Repository
class PlugStatisticsRepository(
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

        hiveJdbcTemplate.fetchSize = 100000

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

        hiveJdbcTemplate.fetchSize = 100000

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

    fun getInterpolationTripDailyInfoData(): List<InterpolationTripDailyInfo> {
        val query: String = """
             select DVC_GB
                    ,DVC_MDL
                    ,SD
                    ,CTGRY
                    ,BS_DT
                    ,DIVC_CNT
                    ,SUM_TOTAL_DIST
                    ,SUM_01_DIST
                    ,SUM_02_DIST
                    ,02_DIST_RT
                    ,SUM_TOTAL_TRIP_CNT
                    ,SUM_01_TRIP_CNT
                    ,SUM_02_TRIP_CNT
                    ,02_TRIP_RT
                    ,02_TRIP_CNT_1
                    ,02_TRIP_CNT_2
                    ,02_TRIP_CNT_3
                    ,02_TRIP_CNT_5
                    ,02_TRIP_CNT_7
                    ,02_TRIP_CNT_10
                    ,02_TRIP_CNT_10_OVER
               FROM DW.LI_PLUG_INTP_RSLT
        """.trimIndent()

        hiveJdbcTemplate.fetchSize = 100000

        return hiveJdbcTemplate.query(query){ rs, _ ->
            InterpolationTripDailyInfo(
                dvc_gb = rs.getString("dvc_gb"),
                dvc_mdl = rs.getString("dvc_mdl"),
                sd = rs.getString("sd"),
                ctgry = rs.getString("ctgry"),
                bs_dt = rs.getString("bs_dt"),
                divc_cnt = rs.getInt("divc_cnt"),
                sum_total_dist = rs.getInt("sum_total_dist"),
                sum_01_dist = rs.getInt("sum_01_dist"),
                sum_02_dist = rs.getInt("sum_02_dist"),
                dist_02_rt = rs.getDouble("02_dist_rt"),
                sum_total_trip_cnt = rs.getInt("sum_total_trip_cnt"),
                sum_01_trip_cnt = rs.getInt("sum_01_trip_cnt"),
                sum_02_trip_cnt = rs.getInt("sum_total_trip_cnt"),
                trip_rt = rs.getDouble("02_trip_rt"),
                trip_cnt_1 = rs.getInt("02_trip_cnt_1"),
                trip_cnt_2 = rs.getInt("02_trip_cnt_2"),
                trip_cnt_3 = rs.getInt("02_trip_cnt_3"),
                trip_cnt_5 = rs.getInt("02_trip_cnt_5"),
                trip_cnt_7 = rs.getInt("02_trip_cnt_7"),
                trip_cnt_10 = rs.getInt("02_trip_cnt_10"),
                trip_cnt_10_over = rs.getInt("02_trip_cnt_10_over"),
            )
        }
    }
}
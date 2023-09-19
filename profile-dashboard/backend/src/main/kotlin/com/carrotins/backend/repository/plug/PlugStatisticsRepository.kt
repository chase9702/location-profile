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

    fun getZeroGpsTripMonthlyInfoData(): List<ZeroGpsTripMonthlyInfo> {
        val query: String = """
             SELECT 
                 bs_dt,
                 dvc_gb,
                 dvc_mdl,
                 sum_total_trip_cnt,
                 sum_01_trip_cnt,
                 sum_03_trip_cnt
               FROM DW.LI_PLUG_ZERO_TRIP_MNTHLY_RSLT


        """.trimIndent()

        hiveJdbcTemplate.fetchSize = 100000

        return hiveJdbcTemplate.query(query){ rs, _ ->
            ZeroGpsTripMonthlyInfo(
                bsDt = rs.getString("bs_dt"),
                dvcGb = rs.getString("dvc_gb"),
                dvcMdl = rs.getString("dvc_mdl"),
                sumTotalTripCnt = rs.getInt("sum_total_trip_cnt"),
                sumNormalTripCnt = rs.getInt("sum_01_trip_cnt"),
                sumZeroTripCnt = rs.getInt("sum_03_trip_cnt"),
                )
        }
    }

    fun getZeroGpsTripDailyInfoData(): List<ZeroGpsTripDailyInfo> {
        val query: String = """
             SELECT 
                 bs_dt,
                 dvc_gb,
                 dvc_mdl,
                 sum_total_trip_cnt,
                 sum_01_trip_cnt,
                 sum_03_trip_cnt,
                 SUM_03_360_TRIP_CNT,
                 SUM_03_420_TRIP_CNT,
                 SUM_03_480_TRIP_CNT,
                 SUM_03_540_TRIP_CNT,
                 SUM_98_600_TRIP_CNT,
                 SUM_98_900_TRIP_CNT,
                 SUM_98_1200_TRIP_CNT,
                 SUM_98_1500_TRIP_CNT,
                 SUM_98_1800_TRIP_CNT,
                 SUM_98_1800_OVER_TRIP_CNT
               FROM DW.LI_PLUG_ZERO_TRIP_DILY_RSLT


        """.trimIndent()

        hiveJdbcTemplate.fetchSize = 100000

        return hiveJdbcTemplate.query(query){ rs, _ ->
            ZeroGpsTripDailyInfo(
                bsDt = rs.getString("bs_dt"),
                dvcGb = rs.getString("dvc_gb"),
                dvcMdl = rs.getString("dvc_mdl"),
                sumTotalTripCnt = rs.getInt("sum_total_trip_cnt"),
                sumNormalTripCnt = rs.getInt("sum_01_trip_cnt"),
                sumZeroTripCnt = rs.getInt("sum_03_trip_cnt"),
                sumZero360TripCnt = rs.getInt("sum_03_360_trip_cnt"),
                sumZero420TripCnt = rs.getInt("sum_03_420_trip_cnt"),
                sumZero480TripCnt = rs.getInt("sum_03_480_trip_cnt"),
                sumZero540TripCnt = rs.getInt("sum_03_540_trip_cnt"),
                sumZero600TripCnt = rs.getInt("sum_98_600_trip_cnt"),
                sumZero900TripCnt = rs.getInt("sum_98_900_trip_cnt"),
                sumZero1200TripCnt = rs.getInt("sum_98_1200_trip_cnt"),
                sumZero1500TripCnt = rs.getInt("sum_98_1500_trip_cnt"),
                sumZero1800TripCnt = rs.getInt("sum_98_1800_trip_cnt"),
                sumZero1800OverTripCnt = rs.getInt("sum_98_1800_over_trip_cnt"),
            )
        }
    }

    fun getInterpolationTripMonthlyInfoData(): List<InterpolationTripMonthlyInfo> {
        val query: String = """
             select DVC_GB
                    ,DVC_MDL
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
               FROM DW.LI_PLUG_INTP_MTHLY_RSLT
        """.trimIndent()

        hiveJdbcTemplate.fetchSize = 1000

        return hiveJdbcTemplate.query(query){ rs, _ ->
            InterpolationTripMonthlyInfo(
                dvcGb = rs.getString("dvc_gb"),
                dvcMdl = rs.getString("dvc_mdl"),
                bsDt = rs.getString("bs_dt"),
                dvcCnt = rs.getInt("divc_cnt"),
                sumTotalDist = rs.getInt("sum_total_dist"),
                sumNormalDist = rs.getInt("sum_01_dist"),
                sumInterpolationDist = rs.getInt("sum_02_dist"),
                distInterpolationRt = rs.getDouble("02_dist_rt"),
                sumTotalTripCnt = rs.getInt("sum_total_trip_cnt"),
                sumNormalTripCnt = rs.getInt("sum_01_trip_cnt"),
                sumInterpolationTripCnt = rs.getInt("sum_02_trip_cnt"),
                sumInterpolationTripRt = rs.getDouble("02_trip_rt"),
            )
        }
    }

    fun getInterpolationTripDailyInfoData(): List<InterpolationTripDailyInfo> {
        val query: String = """
             select DVC_GB
                    ,DVC_MDL
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

        hiveJdbcTemplate.fetchSize = 2000

        return hiveJdbcTemplate.query(query){ rs, _ ->
            InterpolationTripDailyInfo(
                dvcGb = rs.getString("dvc_gb"),
                dvcMdl = rs.getString("dvc_mdl"),
                bsDt = rs.getString("bs_dt"),
                dvcCnt = rs.getInt("divc_cnt"),
                sumTotalDist = rs.getInt("sum_total_dist"),
                sumNormalDist = rs.getInt("sum_01_dist"),
                sumInterpolationDist = rs.getInt("sum_02_dist"),
                distInterpolationRt = rs.getDouble("02_dist_rt"),
                sumTotalTripCnt = rs.getInt("sum_total_trip_cnt"),
                sumNormalTripCnt = rs.getInt("sum_01_trip_cnt"),
                sumInterpolationTripCnt = rs.getInt("sum_02_trip_cnt"),
                tripInterpolationRt = rs.getDouble("02_trip_rt"),
                tripCnt1 = rs.getInt("02_trip_cnt_1"),
                tripCnt2 = rs.getInt("02_trip_cnt_2"),
                tripCnt3 = rs.getInt("02_trip_cnt_3"),
                tripCnt5 = rs.getInt("02_trip_cnt_5"),
                tripCnt7 = rs.getInt("02_trip_cnt_7"),
                tripCnt10 = rs.getInt("02_trip_cnt_10"),
                tripCnt10Over = rs.getInt("02_trip_cnt_10_over"),
            )
        }
    }
}
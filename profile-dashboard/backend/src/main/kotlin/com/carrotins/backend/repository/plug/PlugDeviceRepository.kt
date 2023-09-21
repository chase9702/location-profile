package com.carrotins.backend.repository.plug

import com.carrotins.backend.repository.mapper.DeviceTop100DataMapper
import com.carrotins.backend.repository.mapper.DeviceTripDataMapper
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

/**
 * Created by alvin on 2023/09/13.
 */
@Repository
class PlugDeviceRepository(
    private val hiveJdbcTemplate: JdbcTemplate
) {


    fun getDeviceTopData(deviceGb: String): List<DeviceTop100Data> {

        //FROM dw.li_plug_stats_dly_${deviceGb.lowercase()}_top_100
        val fromQuery = """
            
            FROM dw.li_plug_stats_dly
        """.trimIndent()
        val query = SELECT_DEVICE_QUERY + fromQuery
        return hiveJdbcTemplate.query(query, DeviceTop100DataMapper())
    }

    fun getTripDataFromTopDevice(deviceId: String, deviceGb: String): List<DeviceTripData> {

//        FROM dw.li_plug_stats_trip_${deviceGb.lowercase()}_top_100
//                WHERE dvc_id = '$deviceId'


        val fromQuery = """
            
            FROM dw.li_plug_stats_trip_total_top_100
            WHERE dvc_id = 'TLK1_867199041014277'
        """.trimIndent()
        val query = SELECT_TRIP_QUERY + fromQuery
        return hiveJdbcTemplate.query(query, DeviceTripDataMapper())

    }


    companion object {
        val SELECT_DEVICE_QUERY = """
         SELECT 
                  dvc_id, 
                  plyno, 
                  trip_cnt, 
                  lag_mean, 
                  lag_std, 
                  lag_min, 
                  lag_max, 
                  fix_vld_gps_elapsed_time_mean, 
                  fix_vld_gps_elapsed_time_std, 
                  fix_vld_gps_elapsed_time_min, 
                  fix_vld_gps_elapsed_time_max, 
                  vld_ideal_cnt_sum, 
                  ideal_cnt_sum, 
                  rcv_data_cnt_sum, 
                  invld_gps_cnt_sum, 
                  rcv_lag_time_sum, 
                  cr_prd_cmpcd_nm, 
                  zero_trip_cnt, 
                  zero_trip_ratio, 
                  ver, 
                  tp_mean, 
                  tp_std, 
                  tp_min, 
                  tp_max, 
                  tp_nullcnt, 
                  vx_mean, 
                  vx_std, 
                  vx_min, 
                  vx_max, 
                  vx_nullcnt, 
                  vi_mean, 
                  vi_std, 
                  vi_min, 
                  vi_max, 
                  vi_nullcnt, 
                  rs_0_cnt, 
                  rs_1_cnt, 
                  rs_2_cnt, 
                  rs_3_cnt, 
                  ac_0_cnt, 
                  ac_1_cnt, 
                  ac_2_cnt, 
                  ac_3_cnt, 
                  ac_5_cnt, 
                  ac_7_cnt, 
                  ac_9_cnt, 
                  ac_14_cnt, 
                  ac_19_cnt, 
                  ac_24_cnt, 
                  ac_29_cnt, 
                  ac_39_cnt, 
                  ac_59_cnt, 
                  ac_69_cnt, 
                  ac_99_cnt, 
                  ac_100_cnt, 
                  invld_gps_cnt_ratio, 
                  invld_rcv_lag_time_ratio,
                  part_dt
    """.trimIndent()

        val SELECT_TRIP_QUERY = """
            SELECT
                plyno,
                dvc_id,
                trip_id,
                ver,
                lag,
                rcv_data_cnt,
                start_tr_ct,
                end_tr_ct,
                invld_gps_cnt,
                rcv_lag_time,
                tp_mean,
                tp_std,
                tp_min,
                tp_max,
                tp_nullcnt,
                vx_mean,
                vx_std,
                vx_min,
                vx_max,
                vx_nullcnt,
                vi_mean,
                vi_std,
                vi_min,
                vi_max,
                vi_nullcnt,
                rs_0_cnt,
                rs_1_cnt,
                rs_2_cnt,
                rs_3_cnt,
                ac_0_cnt,
                ac_1_cnt,
                ac_2_cnt,
                ac_3_cnt,
                ac_5_cnt,
                ac_7_cnt,
                ac_9_cnt,
                ac_14_cnt,
                ac_19_cnt,
                ac_24_cnt,
                ac_29_cnt,
                ac_39_cnt,
                ac_59_cnt,
                ac_69_cnt,
                ac_99_cnt,
                ac_100_cnt,
                fix_vld_gps_elapsed_time,
                vld_ideal_cnt,
                ideal_cnt,
                invld_gps_ratio,
                invld_rcv_lag_time_ratio,
                trip_gb,
                cr_prd_cmpcd_nm,
                part_dt
        """.trimIndent()

    }

}
package com.carrotins.backend.repository.mapper

import com.carrotins.backend.repository.plug.DeviceTripData
import com.carrotins.backend.utils.transformNullToEmptyString
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

/**
 * Created by alvin on 2023/09/21.
 */
class DeviceTripDataMapper: RowMapper<DeviceTripData> {
    override fun mapRow(rs: ResultSet, rowNum: Int): DeviceTripData {
        return DeviceTripData(
            transformNullToEmptyString(rs.getString("plyno")),
            transformNullToEmptyString(rs.getString("dvc_id")),
            transformNullToEmptyString(rs.getString("trip_id")),
            transformNullToEmptyString(rs.getString("ver")),
            transformNullToEmptyString(rs.getString("lag")),
            rs.getInt("rcv_data_cnt"),
            transformNullToEmptyString(rs.getString("start_tr_ct")),
            transformNullToEmptyString(rs.getString("end_tr_ct")),
            rs.getInt("invld_gps_cnt"),
            rs.getInt("rcv_lag_time"),
            rs.getFloat("tp_mean"),
            rs.getFloat("tp_std"),
            rs.getFloat("tp_min"),
            rs.getFloat("tp_max"),
            rs.getInt("tp_nullcnt"),
            rs.getFloat("vx_mean"),
            rs.getFloat("vx_std"),
            rs.getFloat("vx_min"),
            rs.getFloat("vx_max"),
            rs.getInt("vx_nullcnt"),
            rs.getFloat("vi_mean"),
            rs.getFloat("vi_std"),
            rs.getFloat("vi_min"),
            rs.getFloat("vi_max"),
            rs.getInt("vi_nullcnt"),
            rs.getInt("rs_0_cnt"),
            rs.getInt("rs_1_cnt"),
            rs.getInt("rs_2_cnt"),
            rs.getInt("rs_3_cnt"),
            rs.getInt("ac_0_cnt"),
            rs.getInt("ac_1_cnt"),
            rs.getInt("ac_2_cnt"),
            rs.getInt("ac_3_cnt"),
            rs.getInt("ac_5_cnt"),
            rs.getInt("ac_7_cnt"),
            rs.getInt("ac_9_cnt"),
            rs.getInt("ac_14_cnt"),
            rs.getInt("ac_19_cnt"),
            rs.getInt("ac_24_cnt"),
            rs.getInt("ac_29_cnt"),
            rs.getInt("ac_39_cnt"),
            rs.getInt("ac_59_cnt"),
            rs.getInt("ac_69_cnt"),
            rs.getInt("ac_99_cnt"),
            rs.getInt("ac_100_cnt"),
            rs.getInt("fix_vld_gps_elapsed_time"),
            rs.getInt("vld_ideal_cnt"),
            rs.getInt("ideal_cnt"),
            rs.getFloat("invld_gps_ratio"),
            rs.getFloat("invld_rcv_lag_time_ratio"),
            transformNullToEmptyString(rs.getString("trip_gb")),
            transformNullToEmptyString(rs.getString("cr_prd_cmpcd_nm")), // 자동차 제조사 이름
            transformNullToEmptyString(rs.getString("part_dt"))
        )
    }
}
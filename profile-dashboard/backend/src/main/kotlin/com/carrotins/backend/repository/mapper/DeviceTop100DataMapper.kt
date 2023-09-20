package com.carrotins.backend.repository.mapper

import com.carrotins.backend.repository.plug.DeviceTop100Data
import com.carrotins.backend.utils.transformNullToEmptyString
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

/**
 * Created by alvin on 2023/09/19.
 */
class DeviceTop100DataMapper : RowMapper<DeviceTop100Data> {
    override fun mapRow(rs: ResultSet, rowNum: Int): DeviceTop100Data {
        return DeviceTop100Data(
            transformNullToEmptyString(rs.getString("dvc_id")),
            transformNullToEmptyString(rs.getString("plyno")),
            rs.getInt("trip_cnt"),
            rs.getFloat("lag_mean"),
            rs.getFloat("lag_std"),
            rs.getInt("lag_min"),
            rs.getInt("lag_max"),
            rs.getFloat("fix_vld_gps_elapsed_time_mean"),
            rs.getFloat("fix_vld_gps_elapsed_time_std"),
            rs.getInt("fix_vld_gps_elapsed_time_min"),
            rs.getInt("fix_vld_gps_elapsed_time_max"),
            rs.getInt("vld_ideal_cnt_sum"),
            rs.getInt("ideal_cnt_sum"),
            rs.getInt("rcv_data_cnt_sum"),
            rs.getInt("invld_gps_cnt_sum"),
            rs.getInt("rcv_lag_time_sum"),
            transformNullToEmptyString(rs.getString("cr_prd_cmpcd_nm")), // 자동차 제조사 이름
            rs.getInt("zero_trip_cnt"), // zero gps trip 수
            rs.getFloat("zero_trip_ratio"), // zero gps trip 비율
            transformNullToEmptyString(rs.getString("ver")), // 펌웨어 버전
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
            rs.getFloat("invld_gps_cnt_ratio"), // 비정상 gps비율
            rs.getFloat("invld_rcv_lag_time_ratio"), // 서버 수신 지연시간 비율
            transformNullToEmptyString(rs.getString("part_dt"))
        )
    }
}
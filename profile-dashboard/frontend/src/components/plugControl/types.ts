export const transFormRsValueToString = (rsValue: string) => {
    if (rsValue === "rs0_cnt") return "No Service"
    else if (rsValue === "rs1_cnt") return "Poor"
    else if (rsValue === "rs2_cnt") return "Fair"
    else return "Good"
}
export const transFormAcValueToString = (acValue: string) => {
    const acString = acValue.match(/\d+/);
    const acNumber = parseInt(acString[0], 10);
    if (acNumber === 100) return acNumber + 'M 초과'
    else if (acNumber === 0) return '1M 미만'
    else return acNumber + 'M 이하'
}

export const deviceModel = [
    {value: 'TOTAL', label: 'TOTAL'},
    {value: 'AMT1', label: 'AMT1'},
    {value: 'TLK1', label: 'TLK1'},
    {value: 'ETO1', label: 'ETO1'},
    {value: 'UNK1', label: 'UNK1'},
    {value: 'LUX1', label: 'LUX1'},
    {value: 'LUX2', label: 'LUX2'},
]

export const personalFilter = [
    {value: 'member_id', label: 'MEMBER ID'},
    {value: 'plyno', label: 'PLYNO'},
    {value: 'dvc_id', label: 'DIVC ID'},
    {value: 'dvc_id', label: 'DIVC ID'},
    {value: 'dvc_id', label: 'DIVC ID'},
]

export const bbiMetricFilter = [
    {value: 'total', label: 'Metric 전체'},
    {value: 'loss', label: '유실율'},
    {value: 'abn_loc', label: '이상위치'},
    {value: 'abn_sp', label: '이상속도(전)'},
    {value: 'abn_fs', label: '이상속도(후)'},
    {value: 'fseg', label: 'dt>2 이상'},
]

export const bbiUnitFilter = [
    {value: 'trip', label: 'trip'},
    {value: 'dvc', label: 'dvc_id'},
    {value: 'member', label: 'mem_id'},
]

export const bbiDistanceFilter = [
    {value: 'dst', label: '거리'},
    {value: 'time', label: '시간'},
]

export const bbiThresholdFilter = [
    {value: 'total', label: 'Threshold 전체'},
    {value: '0_1', label: '0.1'},
    {value: '0_3', label: '0.3'},
    {value: '0_5', label: '0.5'},
    {value: '0_7', label: '0.7'},
    {value: '0_9', label: '0.9'},
]

export const aiUnitFilter = [
    {value: 'trip_id', label: 'trip'},
    {value: 'dvc_id', label: 'dvc_id'},
    {value: 'member_id', label: 'mem_id'},
]

export const bbiBehaviorFilter = [
    {value: 'total_bbi', label: '전체'},
    {value: 'sac', label: '급가속'},
    {value: 'sdc', label: '급감속'},
    {value: 'sst', label: '급출발'},
    {value: 'ssp', label: '급정지'},
]

export const aiLevelFilter = [
    {value: '전체', label: '전체'},
    {value: 'level1', label: 'Level 1'},
    {value: 'level2', label: 'Level 2'},
]

export const aiStatusFilter = [
    {value: '', label: '전체'},
    {value: '99', label: '99'},
    {value: '300', label: '300'},
    {value: '301', label: '301'},
    {value: '400', label: '400'},
]

export const deviceTop100Data = [
    "dvc_id",
    "plyno",
    "trip_cnt",
    "lag_mean",
    "lag_std",
    "lag_min",
    "lag_max",
    "fix_vld_gps_elapsed_time_mean",
    "fix_vld_gps_elapsed_time_std",
    "fix_vld_gps_elapsed_time_min",
    "fix_vld_gps_elapsed_time_max",
    "vld_ideal_cnt_sum",
    "ideal_cnt_sum",
    "rcv_data_cnt_sum",
    "invld_gps_cnt_sum",
    "rcv_lag_time_sum",
    "cr_prd_cmpcd_nm",
    "zero_trip_cnt",
    "zero_trip_ratio",
    "ver",
    "tp_mean",
    "tp_std",
    "tp_min",
    "tp_max",
    "tp_nullcnt",
    "vx_mean",
    "vx_std",
    "vx_min",
    "vx_max",
    "vx_nullcnt",
    "vi_mean",
    "vi_std",
    "vi_min",
    "vi_max",
    "vi_nullcnt",
    "rs_0_cnt",
    "rs_1_cnt",
    "rs_2_cnt",
    "rs_3_cnt",
    "ac_0_cnt",
    "ac_1_cnt",
    "ac_2_cnt",
    "ac_3_cnt",
    "ac_5_cnt",
    "ac_7_cnt",
    "ac_9_cnt",
    "ac_14_cnt",
    "ac_19_cnt",
    "ac_24_cnt",
    "ac_29_cnt",
    "ac_39_cnt",
    "ac_59_cnt",
    "ac_69_cnt",
    "ac_99_cnt",
    "ac_100_cnt",
    "invld_gps_cnt_ratio",
    "invld_rcv_lag_time_ratio",
    "part_dt"
]

export const deviceTripData = [
    "plyno",
    "dvc_id",
    "trip_id",
    "ver",
    "lag",
    "rcv_data_cnt",
    "start_tr_ct",
    "end_tr_ct",
    "invld_gps_cnt",
    "rcv_lag_time",
    "tp_mean",
    "tp_std",
    "tp_min",
    "tp_max",
    "tp_nullcnt",
    "vx_mean",
    "vx_std",
    "vx_min",
    "vx_max",
    "vx_nullcnt",
    "vi_mean",
    "vi_std",
    "vi_min",
    "vi_max",
    "vi_nullcnt",
    "rs_0_cnt",
    "rs_1_cnt",
    "rs_2_cnt",
    "rs_3_cnt",
    "ac_0_cnt",
    "ac_1_cnt",
    "ac_2_cnt",
    "ac_3_cnt",
    "ac_5_cnt",
    "ac_7_cnt",
    "ac_9_cnt",
    "ac_14_cnt",
    "ac_19_cnt",
    "ac_24_cnt",
    "ac_29_cnt",
    "ac_39_cnt",
    "ac_59_cnt",
    "ac_69_cnt",
    "ac_99_cnt",
    "ac_100_cnt",
    "fix_vld_gps_elapsed_time",
    "vld_ideal_cnt",
    "ideal_cnt",
    "invld_gps_ratio",
    "invld_rcv_lag_time_ratio",
    "trip_gb",
    "cr_prd_cmpcd_nm",
    "part_dt"
]

export const boxPlotField = ['max', 'mean+1std' , 'mean', 'mean-1std', 'min' ]


export interface Top100TableDataType {
    part_dt: string;
    addr_cd: string;
    hour: string;
    addr: string;
    rank: number;
    behavior_value: number;
}

export interface TestHexData {
    no: number,
    addr: string,
    hex: string
}

export interface MapBBIHexData {
    hex: string;
    addr: string;
    addr_cd: string;
    sst: number;
    sac: number;
    ssp: number;
    sdc: number;
    total_bbi: number;
    traffic: number;
}

export interface MapPublicHexData {
    hex: string;
    addr: string;
    addr_cd: string;
    serious_cnt: number;
    slight_cnt: number;
    total_cnt: number;
    /*cnt*/
    crossing_center_line_cnt: number,
    etc_cnt: number,
    il_u_turn_cnt: number,
    intersection_cnt: number,
    lane_cnt: number,
    light_cnt: number,
    obstruct_right_cnt: number,
    pedestrian_cnt: number,
    safe_distance_cnt: number,
    safe_driving_cnt: number,
    /*ratio*/
    crossing_center_line_ratio: number,
    etc_ratio: number,
    il_u_turn_ratio: number,
    intersection_ratio: number,
    lane_ratio: number,
    light_ratio: number,
    obstruct_right_ratio: number,
    pedestrian_ratio: number,
    safe_distance_ratio: number,
    safe_driving_ratio: number,
}

export interface MapAIHexData {
    hex: string;
    addr: string;
    addr_cd: string;
    sst: number;
    sac: number;
    ssp: number;
    sdc: number;
    total_bbi: number;
    traffic: number;
}

export interface BBIMetaData {
    hex: string,
    hour: string,
    part_dt: string,
    behavior: string,
    trip_id: string,
    ct: number,
    sp: number,
    fs: number,
    durt: number,
    accel: number,
    ac: number,
    sa: number
}

export interface ExtendedPublicMetaData extends PublicMetaData {
    type: string,
}

export interface PublicMetaData {
    crossing_center_line: number,
    etc: number,
    il_u_turn: number,
    intersection: number,
    lane: number,
    light: number,
    obstruct_right: number,
    pedestrian: number,
    safe_distance: number,
    safe_driving: number,
}

export interface AiMetaData {
    trip_id: string,
    ct: number,
    sp: number,
}

export const Top100DropMenuItems = [
    {
        label: '전체BBI',
        index: 0,
        key: 'total_bbi'
    },
    {
        label: '급출발',
        index: 1,
        key: 'sst'
    },
    {
        label: '급가속',
        index: 2,
        key: 'sac'
    },
    {
        label: '급감속',
        index: 3,
        key: 'sdc'
    },
    {
        label: '급정지',
        index: 4,
        key: 'ssp'
    },
];



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
    sst_meta: MapMetaData[];
    sac_meta: MapMetaData[];
    ssp_meta: MapMetaData[];
    sdc_meta: MapMetaData[];
}

export interface MapPublicHexData {
    hex: string;
    addr: string;
    addr_cd: string;
    serious_cnt: number;
    slight_cnt: number;
    total_cnt: number;
    violation_cnt: PublicMetaData;
    violation_ratio: PublicMetaData;
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


export interface ExtendedMapMetaData extends MapMetaData {
    type: string,
}

export interface MapMetaData {
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



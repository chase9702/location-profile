import { TableProps } from 'antd/es/table';

export interface Top100TableDataType {
  part_dt: string;
  start_date: string;
  end_date: string;
  addr_cd: string;
  hour: string;
  addr: string;
  rank: number;
  behavior_value: number;
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
  crossing_center_line_cnt: number;
  etc_cnt: number;
  il_u_turn_cnt: number;
  intersection_cnt: number;
  lane_cnt: number;
  light_cnt: number;
  obstruct_right_cnt: number;
  pedestrian_cnt: number;
  safe_distance_cnt: number;
  safe_driving_cnt: number;
  /*ratio*/
  crossing_center_line_ratio: number;
  etc_ratio: number;
  il_u_turn_ratio: number;
  intersection_ratio: number;
  lane_ratio: number;
  light_ratio: number;
  obstruct_right_ratio: number;
  pedestrian_ratio: number;
  safe_distance_ratio: number;
  safe_driving_ratio: number;
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
  hex: string;
  hour: string;
  part_dt: string;
  behavior: string;
  trip_id: string;
  ct: number;
  sp: number;
  fs: number;
  durt: number;
  accel: number;
  ac: number;
  sa: number;
}

export interface ExtendedPublicMetaData extends PublicMetaData {
  type: string;
}

export interface PublicMetaData {
  crossing_center_line: number;
  etc: number;
  il_u_turn: number;
  intersection: number;
  lane: number;
  light: number;
  obstruct_right: number;
  pedestrian: number;
  safe_distance: number;
  safe_driving: number;
}

export interface AiMetaData {
  trip_id: string;
  ct: number;
  sp: number;
}

export const Top100DropMenuItems = [
  {
    label: '전체BBI',
    index: 0,
    key: 'total_bbi',
  },
  {
    label: '급출발',
    index: 1,
    key: 'sst',
  },
  {
    label: '급가속',
    index: 2,
    key: 'sac',
  },
  {
    label: '급감속',
    index: 3,
    key: 'sdc',
  },
  {
    label: '급정지',
    index: 4,
    key: 'ssp',
  },
];

export const bbiColumns: TableProps<BBIMetaData>['columns'] = [
  {
    title: '분류',
    dataIndex: 'behavior',
    key: 'behavior',
    align: 'center',
    fixed: 'left',
  },
  {
    title: '시간',
    dataIndex: 'hour',
    key: 'hour',
    align: 'center',
  },
  {
    title: '트립ID',
    dataIndex: 'trip_id',
    key: 'trip_id',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: 'CT',
    dataIndex: 'ct',
    key: 'ct',
    align: 'center',
  },
  {
    title: 'SP',
    dataIndex: 'sp',
    key: 'sp',
    align: 'center',
  },
  {
    title: 'FS',
    dataIndex: 'fs',
    key: 'fs',
    align: 'center',
  },
  {
    title: 'DURT',
    dataIndex: 'durt',
    key: 'durt',
    align: 'center',
  },
  {
    title: 'ACCEL',
    dataIndex: 'accel',
    key: 'accel',
    align: 'center',
    render: (value: number) => value.toFixed(2),
  },
  {
    title: 'AC',
    dataIndex: 'ac',
    key: 'ac',
    align: 'center',
  },
  {
    title: 'SA',
    dataIndex: 'sa',
    key: 'sa',
    align: 'center',
  },
];

export const publicColumns: TableProps<ExtendedPublicMetaData>['columns'] = [
  {
    title: '분류',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    fixed: 'left',
    width: 80,
  },
  {
    title: '중앙선침범',
    dataIndex: 'crossing_center_line',
    key: 'crossing_center_line',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '기타',
    dataIndex: 'etc',
    key: 'etc',
    width: 80,
    align: 'center',
  },
  {
    title: '불법유턴',
    dataIndex: 'il_u_turn',
    key: 'il_u_turn',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '교차로운행방법위반',
    dataIndex: 'intersection',
    key: 'intersection',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '차로위반',
    dataIndex: 'lane',
    key: 'lane',
    align: 'center',
    width: 100,
  },
  {
    title: '신호위반',
    dataIndex: 'light',
    key: 'light',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '직진우회전진행방해',
    dataIndex: 'obstruct_right',
    key: 'obstruct_right',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '보행자보호의무위반',
    dataIndex: 'pedestrian',
    key: 'pedestrian',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '안전거리미확보',
    dataIndex: 'safe_distance',
    key: 'safe_distance',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '안전운전불이행',
    dataIndex: 'safe_driving',
    key: 'safe_driving',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
];

export const aiColumns: TableProps<AiMetaData>['columns'] = [
  {
    title: '트립ID',
    dataIndex: 'trip_id',
    key: 'trip_id',
    align: 'center',
  },
  {
    title: 'CT',
    dataIndex: 'ct',
    key: 'ct',
    align: 'center',
  },
  {
    title: 'SP',
    dataIndex: 'sp',
    key: 'sp',
    align: 'center',
  },
];

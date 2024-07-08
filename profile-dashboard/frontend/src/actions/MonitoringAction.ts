import { Top100TableDataType } from '@src/components/monitoring/map/data-types';

export const SET_SELECTED_TABLE_DATA = 'SET_SELECTED_TABLE_DATA';

// 액션 생성 함수
export const setSelectedTableData = (data: Top100TableDataType) => {
  return {
    type: SET_SELECTED_TABLE_DATA,
    data,
  };
};

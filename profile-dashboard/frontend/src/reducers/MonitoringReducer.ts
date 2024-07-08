import { SET_SELECTED_TABLE_DATA } from '@src/actions/MonitoringAction';
import { Top100TableDataType } from '@src/components/monitoring/map/data-types';

export interface MonitoringState {
  selectedData: Top100TableDataType;
}

export const initialState: MonitoringState = {
  selectedData: null,
};

const monitoringReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TABLE_DATA: {
      return {
        ...state,
        selectedData: action.data,
      };
    }
    default:
      return state;
  }
};

export default monitoringReducer;

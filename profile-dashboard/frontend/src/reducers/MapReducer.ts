import { createAction, handleActions } from 'redux-actions';
import { default as ActionTypes } from '@kepler.gl/actions/dist/action-types';

export interface MapState {
  mapIndex: number;
  layer: any;
}

const initialState: MapState = {
  mapIndex: -1,
  layer: {},
};

const mapReducer = handleActions(
  {
    [ActionTypes.LAYER_CLICK]: (state, action) => {
      console.log(action.payload.info);

      return {
        ...state,
        mapIndex: action.payload.info.index || initialState.mapIndex,
        layer: action.payload.info.layer || initialState.layer,
      };
    },
    [ActionTypes.LAYER_VISUAL_CHANNEL_CHANGE]: (state, action) => {
      return {
        ...state,
      };
    },
  },
  initialState
);

export default mapReducer;

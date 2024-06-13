import {createAction, handleActions} from 'redux-actions';
import {default as ActionTypes} from '@kepler.gl/actions/dist/action-types';


export interface MapState {
    mapIndex: string;
}


const initialState: MapState = {
    mapIndex: 'index'
};

const mapReducer = handleActions(
    {
        [ActionTypes.LAYER_CLICK]: (state, action) => {
            return {
                ...state,
                mapIndex: action.payload.info.index || initialState.mapIndex
            }
        },
        [ActionTypes.LAYER_VISUAL_CHANNEL_CHANGE]:(state, action)=>{
            return {
                ...state,
            }
        }
    },
    initialState
);

export default mapReducer
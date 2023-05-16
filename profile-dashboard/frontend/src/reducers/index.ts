import {combineReducers} from 'redux';
import {keplerGlReducer} from 'kepler.gl/reducers';
import menuSelectReducer, {MenuSelectState} from "@src/reducers/MenuSelectReducer"


export interface StoreState {
    menuSelect: MenuSelectState;

}

const rootReducer = combineReducers({
    keplerGl: keplerGlReducer,
    menuSelect: menuSelectReducer,
});

export default rootReducer;
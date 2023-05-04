import {combineReducers} from 'redux';

import menuSelectReducer, {MenuSelectState} from "@src/reducers/MenuSelectReducer"

export interface StoreState {
    menuSelect: MenuSelectState;

}

const rootReducer = combineReducers<StoreState>({
    menuSelect: menuSelectReducer,
});

export default rootReducer;
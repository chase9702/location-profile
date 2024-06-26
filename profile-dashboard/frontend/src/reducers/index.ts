import {combineReducers} from 'redux';
import {keplerGlReducer} from '@kepler.gl/reducers';
import menuSelectReducer, {MenuSelectState} from "@src/reducers/MenuSelectReducer"
import authReducer, {AuthState} from "@src/reducers/AuthReducer";
import deviceReducer, {DeviceState} from "@src/reducers/DeviceReducer";
import mapReducer, {MapState} from "@src/reducers/MapReducer";
import monitoringReducer, {MonitoringState} from "@src/reducers/MonitoringReducer";
import {KeplerGlState} from "kepler.gl/src/reducers";

interface CustomKeplerGlState extends KeplerGlState {
    topMap?: any; // 특정 맵 ID를 타입에 명시
}

export interface StoreState {
    menuSelect: MenuSelectState
    auth: AuthState
    device: DeviceState
    map: MapState,
    monitoring: MonitoringState,
    keplerGl: CustomKeplerGlState
}

const styleURL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_STYLE_JSON_PRODUCTION
        : process.env.REACT_APP_STYLE_JSON_DEVELOPMENT;


const mapStyles = {
    map: {
        id: 'maptile',
        label: 'map',
        url: styleURL,
    }
};
const customizedKeplerGlReducer = keplerGlReducer.initialState({
    mapStyle: {
        mapStyles,
        styleType: 'maptile'
    },
    uiState: {
        activeSidePanel: null,
        currentModal: null
    }
});


const rootReducer = combineReducers({
    keplerGl: customizedKeplerGlReducer,
    menuSelect: menuSelectReducer,
    auth: authReducer,
    device: deviceReducer,
    map: mapReducer,
    monitoring: monitoringReducer
});

export default rootReducer;
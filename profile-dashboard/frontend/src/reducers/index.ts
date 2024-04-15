import {combineReducers} from 'redux';
import {keplerGlReducer} from 'kepler.gl/reducers';
import menuSelectReducer, {MenuSelectState} from "@src/reducers/MenuSelectReducer"
import authReducer, {AuthState} from "@src/reducers/AuthReducer";
import deviceReducer, {DeviceState} from "@src/reducers/DeviceReducer";


export interface StoreState {
    menuSelect: MenuSelectState
    auth: AuthState
    device: DeviceState

}

const styleURL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_STYLE_JSON_PRODUCTION
        : process.env.REACT_APP_STYLE_JSON_DEVELOPMENT;


const mapStyles = {
    // local: {
    //     id: 'local',
    //     label: 'Voyager',
    //     url: 'https://api.maptiler.com/maps/voyager/style.json?key=ySQ0fIYn7eSl3ppOeEJd',
    // },
    // white: {
    //     id: 'terrain1',
    //     label: 'white',
    //     url: 'http://localhost:8081/style.json',
    // },
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
    uiState:{
        activeSidePanel: null,
        currentModal: null
    }
});


const rootReducer = combineReducers({
    keplerGl: customizedKeplerGlReducer,
    menuSelect: menuSelectReducer,
    auth: authReducer,
    device: deviceReducer
});

export default rootReducer;
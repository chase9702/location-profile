import {combineReducers} from 'redux';
import {keplerGlReducer} from 'kepler.gl/reducers';
import menuSelectReducer, {MenuSelectState} from "@src/reducers/MenuSelectReducer"


export interface StoreState {
    menuSelect: MenuSelectState;

}

const styleURL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_STYLE_JSON_PRODUCTION
        : process.env.REACT_APP_STYLE_JSON_DEVELOPMENT;


const mapStyles = {
    local: {
        id: 'local',
        label: 'Voyager',
        url: 'https://api.maptiler.com/maps/voyager/style.json?key=ySQ0fIYn7eSl3ppOeEJd',
    },
    white: {
        id: 'terrain1',
        label: 'white',
        url: 'http://localhost:8081/style.json',
    },
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
    }
});



const rootReducer = combineReducers({
    keplerGl: customizedKeplerGlReducer,
    menuSelect: menuSelectReducer,
});

export default rootReducer;
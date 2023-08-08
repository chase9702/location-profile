import {combineReducers} from 'redux';
import {keplerGlReducer} from 'kepler.gl/reducers';
import menuSelectReducer, {MenuSelectState} from "@src/reducers/MenuSelectReducer"


export interface StoreState {
    menuSelect: MenuSelectState;

}



const mapStyles = {
    voyager: {
        id: 'voyager',
        label: 'Voyager',
        // url: 'https://api.maptiler.com/maps/voyager/style.json?key=ySQ0fIYn7eSl3ppOeEJd'
        url: 'http://localhost:8081/kkk.json',
        // icon: 'https://api.maptiler.com/maps/voyager/256/0/0/0.png?key=ySQ0fIYn7eSl3ppOeEJd'
    },
    terrain: {
        id: 'terrain',
        label: 'Outdoor',
        // url: 'https://api.maptiler.com/maps/outdoor/style.json?key=ySQ0fIYn7eSl3ppOeEJd'
        url: 'http://localhost:8081/test-style.json',
        // icon: 'https://openmaptiles.org/img/styles/terrain.jpg',
    }
};
const customizedKeplerGlReducer = keplerGlReducer.initialState({
    mapStyle: {
        mapStyles,
        styleType: 'terrain'
    }
});



const rootReducer = combineReducers({
    keplerGl: customizedKeplerGlReducer,
    menuSelect: menuSelectReducer,
});

export default rootReducer;
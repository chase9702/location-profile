import {
    SET_SELECT_MENU
} from "@src/actions/MenuSelectAction"

export interface MenuSelectState {
    selectedMenu: string;
}

export const initialState: MenuSelectState = {
    selectedMenu: 'home'
}

const menuSelectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECT_MENU: {
            return {
                ...state,
                selectedMenu: action.menuName
            }
        }
        default:
            return state;
    }
}

export default menuSelectReducer
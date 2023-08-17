import {
    SET_AUTH_INFO,
    SET_SSOID,
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN
} from "@src/actions/AuthAction"

export interface AuthState {
    userName: string;
    userRole: string;
    ssoId: string;
    accessToken: string;
    refreshToken: string;
}

export const initialState: AuthState = {
    userName: 'UNKNOWN',
    userRole: 'UNKNOWN',
    ssoId: 'UNKNOWN',
    accessToken: null,
    refreshToken: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_INFO: {
            return {
                ...state,
                userName: action.authInfo.userName,
                userRole: action.authInfo.userRole
            }
        }
        case SET_SSOID: {
            return {
                ...state,
                ssoId: action.ssoId,
            }
        }
        case SET_ACCESS_TOKEN: {
            return {
                ...state,
                accessToken: action.accessToken
            }
        }
        case SET_REFRESH_TOKEN: {
            return {
                ...state,
                refreshToken: action.refreshToken
            }
        }
        default:
            return state;
    }
}

export default authReducer
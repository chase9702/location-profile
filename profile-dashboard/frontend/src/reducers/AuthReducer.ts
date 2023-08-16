import {
    SET_AUTH_INFO,
    SET_SSOID
} from "@src/actions/AuthAction"

export interface AuthState {
    userName: string;
    userRole: string;
    ssoId: string;
}

export const initialState: AuthState = {
    userName: 'UNKNOWN',
    userRole: 'UNKNOWN',
    ssoId: 'UNKNOWN'
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
        default:
            return state;
    }
}

export default authReducer
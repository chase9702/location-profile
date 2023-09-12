// 액션
export const SET_AUTH_INFO = "SET_AUTH_INFO";
export const SET_SSOID = "SET_SSOID";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN";
export const SET_RESULTCODE = "SET_RESULTCODE";

// 액션 생성 함수
export const setAuthInfo = (authInfo: AuthInfo) => {
    return {
        type: SET_AUTH_INFO,
        authInfo
    }
};

export const setSSOId = (ssoId: String) => {
    console.log("dispatch:::::::::::")
    console.log(ssoId)
    return {
        type: SET_SSOID,
        ssoId
    }
};

export const setResultCode = (resultCode: String) => {
    return {
        type: SET_RESULTCODE,
        resultCode
    }
};

export const setAccessToken = (accessToken: String) => {
    return {
        type: SET_ACCESS_TOKEN,
        accessToken
    }
};

export const setRefreshToken = (refreshToken: String) => {
    return {
        type: SET_REFRESH_TOKEN,
        refreshToken
    }
};



// 액션 타입
export interface AuthInfo {
    userName: string;
    userRole: string;
}

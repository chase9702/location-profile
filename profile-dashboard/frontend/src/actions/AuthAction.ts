// 액션
export const SET_AUTH_INFO = "SET_AUTH_INFO";
export const SET_SSOID = "SET_SSOID";

// 액션 생성 함수
export const setAuthInfo = (autInfo: AuthInfo) => {
    return {
        type: SET_AUTH_INFO,
        autInfo
    }
};

export const setSSOId = (ssoId: String) => {
    return {
        type: SET_SSOID,
        ssoId
    }
};


// 액션 타입
export interface AuthInfo {
    userName: string;
    userRole: string;
}

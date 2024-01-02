import {useEffect, useState} from "react";
import {NotifyError} from "@src/components/common/Notification";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "@src/reducers";
import {authGet, authPost, authPut, get} from "@src/api";
import {
    setAccessToken,
    setAuthInfo,
    setRefreshToken,
    setSSOId,
    setResultCode,
    setTokenExpDate
} from "@src/actions/AuthAction";
import JwtDecode from "jwt-decode";
import {clearLocalStorage, profileRedirectUrl} from "@src/common/auth/constantValue";
import axios from "axios";

const AuthProvider = ({children}) => {

    const dispatch = useDispatch();
    const ssoId = useSelector((state: StoreState) => state.auth.ssoId)
    const accessToken = useSelector((state: StoreState) => state.auth.accessToken)
    const refreshToken = useSelector((state: StoreState) => state.auth.refreshToken)
    const resultCode = useSelector((state: StoreState) => state.auth.resultCode)
    const expDate = useSelector((state: StoreState) => state.auth.expDate)

    const ssoLogin = () => {
        authPost<any>("/auth/sso/login", {
            redirectUrl: profileRedirectUrl,
        }).then((jsonData) => {
            if (jsonData.redirectUrl) {
                window.location.href = jsonData.redirectUrl;
            }
            dispatch(setSSOId(jsonData.ssoId ? jsonData.ssoId : ""))
            dispatch(setResultCode(jsonData.resultCode ? jsonData.resultCode : ""))

            if (jsonData.resultCode === "1") {
                jwtLogin(jsonData);
            }
        }).catch((e) => {
            NotifyError(e);
        });

    }

    const jwtLogin = (response) => {
        if (process.env.NODE_ENV.startsWith("production")) {
            if (response.resultCode === "1") {
                authPost<any>("/auth/login", {
                    id: response.ssoId,
                    realm: "location_intelligence",
                }).then((jsonData) => {
                    setJwtLoginInfo(jsonData);
                }).catch((e) => {
                    NotifyError(e);
                })
            }
        } else {
            const url = 'http://predev-imbauth.carrotins.com:9005/api/bauth/v1/backend/auth/login';
            const data = {
                id: '8888888',
                realm: 'location_intelligence'
            };
            const headers = {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            };

            axios.post(url, data, {headers})
                .then(jsonData => {
                    // 요청 성공 시 처리
                    console.log('응답 데이터:', jsonData.data);
                    setJwtLoginInfo(jsonData.data);
                })
                .catch(error => {
                    // 요청 실패 시 처리
                    console.error('에러:', error);
                });
        }
    }

    const setJwtLoginInfo = (response: any) => {

        dispatch(setAccessToken(response.access_token))
        dispatch(setRefreshToken(response.refresh_token))

        window.localStorage.setItem("profileAccessToken", response.access_token);
        window.localStorage.setItem("profileRefreshToken", response.refresh_token);

        const jwtObj: any = JwtDecode(response.access_token);

        dispatch(setTokenExpDate(jwtObj.exp))


        dispatch(setAuthInfo({
            userName:jwtObj.pri_username ?? "UNKNOWN",
            userRole: jwtObj.pri_auth.split(",")
        }))

        window.localStorage.setItem("userName", jwtObj.pri_username ?? "UNKNOWN");
        window.localStorage.setItem("userRole", jwtObj.pri_auth.split(","));

        dispatch(setAuthInfo({
            userName: jwtObj.pri_username ?? "UNKNOWN",
            userRole: jwtObj.pri_auth.split(",")
        }))

    }

    const init = () => {
        console.log("************************init*****************")
        const at = window.localStorage.getItem("profileAccessToken");
        if (at === null) {
            ssoLogin();
        }
    };

    // 로컬 환경 테스트 용도
    const localInit = () => {
        console.log("************************localInit*****************")
        jwtLogin({ssoId: "8888888", resultCode: "1"})
    };

    useEffect(() => {
        console.log("ssoId changed:", ssoId);
        console.log("accessToken changed:", accessToken);
        console.log("expDate changed:", expDate)
    }, [ssoId, accessToken, resultCode, refreshToken, expDate]);

    useEffect(() => {
        if (process.env.NODE_ENV.startsWith("production")) {
            init();
        } else {
            localInit();
        }
    }, []);

    return children
}

export default AuthProvider;


export const logoutApi = () => {
    authPut<any>("/auth/sso/logout", null)
        .then((jsonData) => {
            if (jsonData.redirectUrl === undefined) {
                return
            } else {
                authGet(jsonData.redirectUrl)
                    .then(() => {
                    })!
                    .finally(() => {
                        window.location.href = "/"
                    })
            }
        }).catch((e) => {
        NotifyError(e);
    });
}

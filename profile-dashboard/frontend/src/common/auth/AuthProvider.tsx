import {useEffect, useState} from "react";
import {NotifyError} from "@src/components/common/Notification";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "@src/reducers";
import {authPost, authPut, get} from "@src/api";
import {setAccessToken, setAuthInfo, setRefreshToken, setSSOId} from "@src/actions/AuthAction";
import JwtDecode from "jwt-decode";
import {profileRedirectUrl} from "@src/common/auth/constantValue";

const AuthProvider = ({children}) => {

    const dispatch = useDispatch();
    const ssoId = useSelector((state: StoreState) => state.auth.userName)
    const accessToken = useSelector((state: StoreState) => state.auth.accessToken)
    const refreshToken = useSelector((state: StoreState) => state.auth.refreshToken)

    const [resultCode, setResultCode] = useState(null)

    const ssoLogin = () => {
        if (ssoId === 'UNKNOWN' || ssoId === "") {
            // SSO 로그인 시도
            authPost<any>("/auth/sso/login", {
                redirectUrl: profileRedirectUrl,
            }).then((jsonData) => {

                if (jsonData.redirectUrl) {
                    window.location.href = jsonData.redirectUrl
                }
                setSSOLoginInfo(jsonData)

            }).catch((e) => {
                NotifyError(e);
            });
        }
    }
    const setSSOLoginInfo = (response: any) => {
        dispatch(setSSOId(response.ssoId ? response.ssoId : ""))
        setResultCode(response.resultCode ? response.resultCode : "");
    }

    const jwtLogin = () => {
        if (ssoId && resultCode === "1") {
            authPost<any>("/auth/login", {
                id: ssoId,
                realm: "location-intelligence",
            }).then((jsonData) => {

                console.log(jsonData);
                console.log(`@@ ssoId: ${ssoId}`);
                setJwtLoginInfo(jsonData);

            }).catch((e) => {
                NotifyError(e);
            })
        }
    }

    const setJwtLoginInfo = (response: any) => {
        dispatch(setAccessToken(response.access_token))
        dispatch(setRefreshToken(response.refresh_token))

        window.localStorage.setItem("profileAccessToken", accessToken);
        window.localStorage.setItem("profileRefreshToken", refreshToken);

        const jwtObj: any = JwtDecode(accessToken);

        dispatch(setAuthInfo({
            userName: jwtObj.pri_username ?? "UNKNOWN",
            userRole: jwtObj.pri_auth.split(",")
        }))

    }
//TODO 이 로그아웃은 다른곳으로 빼야 할듯?
    const logout = () => {
        authPut<any>("/auth/sso/logout", null)
            .then((jsonData) => {
                if (jsonData.redirectUrl === undefined) {
                    return;
                } else {
                    setLogout();
                    window.location.href = jsonData.redirectUrl
                }
            }).catch((e) => {
            NotifyError(e);
        });
    }

    const setLogout = () => {
        window.localStorage.removeItem("profileAccessToken");
        window.localStorage.removeItem("profileRefreshToken");
        dispatch(setAccessToken(undefined))
        dispatch(setRefreshToken(undefined))
    }

    const init = () => {
        //sso login
        ssoLogin();
        //jwt login
        jwtLogin();
    };

    // 로컬 환경 테스트 용도
    const localInit = () => {
        try {
            // window.localStorage.removeItem("cxmAccessToken");
            // window.localStorage.removeItem("cxmRefreshToken");
            // JWT 로그인 시도
            // jwtLogin();
            // UserStore.pullUser(AuthStore.getAccessToken);
        } catch (e) {
            NotifyError(e);
        }
    };


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
import {useEffect, useState} from "react";
import {NotifyError} from "@src/components/common/Notification";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "@src/reducers";
import {authPost, authPut, get} from "@src/api";
import {setAccessToken, setAuthInfo, setRefreshToken, setSSOId, setResultCode} from "@src/actions/AuthAction";
import JwtDecode from "jwt-decode";
import {profileRedirectUrl} from "@src/common/auth/constantValue";

const AuthProvider = ({children}) => {

    const dispatch = useDispatch();
    const ssoId = useSelector((state: StoreState) => state.auth.ssoId)
    const accessToken = useSelector((state: StoreState) => state.auth.accessToken)
    const refreshToken = useSelector((state: StoreState) => state.auth.refreshToken)
    const resultCode = useSelector((state: StoreState) => state.auth.resultCode)


    const ssoLogin = () => {
        console.log("try sso login:")

        // SSO 로그인 시도
        authPost<any>("/auth/sso/login", {
            redirectUrl: profileRedirectUrl,
        }).then((jsonData) => {
            console.log("auth/sso/login result:::::::::::::::::::::")
            console.log(jsonData)
            if (jsonData.redirectUrl) {
                window.location.href = jsonData.redirectUrl;
            }
            console.log("redirect is null")
            console.log(jsonData.resultCode)
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
        console.log("jwt login")
        console.log("ssoid:" + ssoId)
        console.log("resultCode:" + resultCode)
        if (response.resultCode === "1") {
            authPost<any>("/auth/login", {
                id: response.ssoId,
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
        console.log("set JwtLoginInfo")
        dispatch(setAccessToken(response.access_token))
        dispatch(setRefreshToken(response.refresh_token))

        window.localStorage.setItem("profileAccessToken", response.access_token);
        window.localStorage.setItem("profileRefreshToken", response.refresh_token);

        const jwtObj: any = JwtDecode(response.access_token);

        console.log("JwtLoginInfo")
        console.log(jwtObj)
        dispatch(setAuthInfo({
            userName: jwtObj.pri_username ?? "UNKNOWN",
            userRole: jwtObj.pri_auth.split(",")
        }))

    }

    const init = () => {
        console.log("************************init*****************")
        //sso login
        const at = window.localStorage.getItem("profileAccessToken");
        console.log(at)
        console.log(accessToken)
        if (at === null || accessToken === null) {
            console.log("at is empty")
            ssoLogin();
        }
        console.log("end to login")
        //jwt loginÏ
    };

    // 로컬 환경 테스트 용도
    const localInit = () => {
        console.log("************************localInit*****************")
        jwtLogin(9999997)
    };


    useEffect(() => {
        console.log("ssoId changed:", ssoId);
        console.log("accessToken changed:", accessToken);
    }, [ssoId, accessToken, resultCode]);

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

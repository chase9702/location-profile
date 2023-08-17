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
    const userName = useSelector((state: StoreState) => state.auth.userName)
    const userRole = useSelector((state: StoreState) => state.auth.userName)
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

        window.localStorage.setItem("cxmAccessToken", accessToken);
        window.localStorage.setItem("cxmRefreshToken", refreshToken);

        const jwtObj: any = JwtDecode(accessToken);

        dispatch(setAuthInfo({
            userName: jwtObj.pri_username ?? "UNKNOWN",
            userRole: jwtObj.pri_auth.split(",")
        }))

    }

    const logout =  () => {
        window.localStorage.removeItem("cxmAccessToken");
        window.localStorage.removeItem("cxmRefreshToken");
        authPut<any>("/auth/sso/logout", null)
            .then((jsonData)=>{
                if (jsonData.redirectUrl === undefined) {
                    return;
                }
            }).catch((e)=>{
                NotifyError(e);
        });



        this.setAccessToken(undefined);
        this.setRefreshToken(undefined);

        Agent.superagent
            .get(response.redirectUrl)
            .withCredentials()
            .then(() => {
            })
            .finally(() => {
                window.location.href = `${REACT_APP_HISTORY_PREFIX}/`;
            });
    }

    const init =  () => {
        //sso login
        ssoLogin();
        //jwt login
        jwtLogin();
    };

    // 로컬 환경 테스트 용도
    const localInit =  () => {
        try {
            // window.localStorage.removeItem("cxmAccessToken");
            // window.localStorage.removeItem("cxmRefreshToken");
            // JWT 로그인 시도


            jwtLogin();

            UserStore.pullUser(AuthStore.getAccessToken);
            UserStore.initHistory();
        } catch (err) {
            switch (err.status) {
                case 400:
                    err.display = "잘못된 요청입니다 확인 후 다시 이용해주세요.";
                    break;
                case 401:
                    err.display = "허용되지 않은 요청입니다 확인 후 다시 이용해주세요.";
                    break;
                case 403:
                    err.display = "허용되지 않은 IP 입니다 확인 후 다시 이용해주세요.";
                    break;
                case 500:
                    err.display = "서버 오류입니다 잠시 후 다시 이용해주세요.";
                    break;
                default:
                    err.display = "서버와의 연결이 원활하지 않습니다 잠시 후 다시 이용해주세요.";
                    break;
            }
            throw err;
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
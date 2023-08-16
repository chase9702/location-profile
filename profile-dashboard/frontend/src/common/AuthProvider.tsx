import {useEffect} from "react";
import {NotifyError} from "@src/components/common/Notification";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "@src/reducers";
import {authPost} from "@src/api";
import {setSSOId} from "@src/actions/AuthAction";

const AuthProvider = ({children}) => {

    const dispatch = useDispatch();
    const userName = useSelector((state: StoreState) => state.auth.userName)
    const userRole = useSelector((state: StoreState) => state.auth.userName)
    const ssoId = useSelector((state: StoreState) => state.auth.userName)

    const authUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_AUTH_BASE_URL_PRODUCTION
            : process.env.REACT_APP_AUTH_BASE_URL_DEVELOPMENT;

    const redirectUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_AUTH_REDIRECT_URL_PRODUCTION
            :process.env.REACT_APP_AUTH_REDIRECT_URL_DEVELOPMENT;

    const ssoLogin = async () => {
        const response = await authPost<any>("/auth/sso/login", {
            redirectUrl: redirectUrl,
        });

        if (response.redirectUrl) {
            window.location.href = response.redirectUrl;
        }
        return response;
    }

    const init = async () => {

        let resultCode = ""
        if (ssoId==='UNKNOWN') {
            try {
                // SSO 로그인 시도
                const response = await ssoLogin();
                dispatch(setSSOId(response.ssoId ? response.ssoId : ""))
                resultCode = response.resultCode ? response.resultCode : "";
            } catch(err) {
                NotifyError(err)
            }
        }

        // SSO 로그인 결과가 성공인 경우 === 1
        if (ssoId && resultCode === "1") {
            try {
                // JWT 로그인 시도
                const response = await AuthStore.jwtLogin(ssoId);
                // 인증 처리
                UserStore.pullUser(AuthStore.getAccessToken);
                UserStore.initHistory();
            } catch(err) {
                NotifyError(err)
            }
        } else {
            console.log(`SSO 로그인 실패, ssoId: ${ssoId}, resultCode: ${resultCode}`);
            // SSO 로그인 페이지로 리다이렉트 된 상태
        }
    };

    // 로컬 환경 테스트 용도
    const localInit = async () => {
        try {
            // window.localStorage.removeItem("cxmAccessToken");
            // window.localStorage.removeItem("cxmRefreshToken");
            // JWT 로그인 시도
            const response = await AuthStore.jwtLogin("9999997");

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
        // if (REACT_APP_ENV.startsWith("LOCAL")) {
        //     localInit();
        // } else {
        //     init();
        // }
    }, []);

    return children
}

export default AuthProvider;
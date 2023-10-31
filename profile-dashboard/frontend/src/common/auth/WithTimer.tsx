import {useSelector} from "react-redux";
import {StoreState} from "@src/reducers";
import {clearLocalStorage} from "@src/common/auth/constantValue";
import {logoutApi} from "@src/common/auth/AuthProvider";
import {useEffect} from "react";

const WithTimer = ({children}) => {

    const expDate = useSelector((state: StoreState) => state.auth.expDate)
    const timeOut = 3660000 // 61분


    const tokenChecker = () => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (expDate !== 0 && currentTimestamp > expDate) {
            clearLocalStorage()
            logoutApi()
        }
    }


    useEffect(() => {
        if (expDate !== 0) {
            setTimeout(tokenChecker, timeOut)
        }
    }, [expDate]);


    return children;
};

export default WithTimer;

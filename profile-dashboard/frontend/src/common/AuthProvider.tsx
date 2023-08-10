import {useEffect} from "react";

const AuthProvider = ({children}) => {



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
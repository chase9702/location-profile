import {useEffect} from "react";

const AuthProvider = ({children}) => {

    const styleURL =
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_STYLE_JSON_PRODUCTION
            : process.env.REACT_APP_STYLE_JSON_DEVELOPMENT;


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
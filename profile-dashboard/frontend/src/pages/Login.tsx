import React, {useEffect} from 'react';
import {Button} from "antd";
import {withRouter} from "react-router-dom";
import {get} from "@src/api";
import {NotifyError} from "@src/components/common/Notification";


interface State {
}

interface Props {
}

const Login = (): React.ReactElement => {

    const handleLogin = () => {

        get<[]>("/api/login")
            .then((jsonData) => {
                console.log(jsonData)
            })
            .catch((e) => {
                NotifyError(e);
            });
    };
    useEffect(()=>{
        handleLogin()
    });

    return (
        <div>
            login 중이다.
        </div>
    )

};

export default withRouter(Login)
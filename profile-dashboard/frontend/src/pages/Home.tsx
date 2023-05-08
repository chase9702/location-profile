import React from 'react';
import {Button} from "antd";
import {withRouter} from "react-router-dom";


interface State {
}

interface Props {
}

const Home = (): React.ReactElement => {

        return (
            <div>
                홈이다 이거
            </div>
        )

};

export default withRouter(Home)
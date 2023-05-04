import React from "react";
import {Typography, Button, Card, Empty, Spin} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectMenu} from "@src/actions/MenuSelectAction";
import {withRouter} from "react-router-dom";
interface State {}

interface Props {
}

const LocationProfileDashBoard = (): React.ReactElement => {


        return (
            <div>
                <Button>
                    dashboard버튼이다.
                </Button>
            </div>
        )

};

export default withRouter(LocationProfileDashBoard)
import React from "react";
import {Typography, Button, Card, Empty, Spin} from 'antd';

const LocationProfileDashBoard = (): JSX.Element => {
    return (
        <div>
            <Button>
                dashboard버튼이다.
            </Button>
        </div>
    )
};

export const LocationProfileDashBoardElement = React.createElement(
    LocationProfileDashBoard,
);

export default LocationProfileDashBoardElement
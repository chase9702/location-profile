import React from 'react';
import {Button} from "antd";


const Home = (): JSX.Element => {
    return (
        <div>
           홈이다
        </div>
    )
};

export const HomeElement = React.createElement(
    Home,
);

export default HomeElement
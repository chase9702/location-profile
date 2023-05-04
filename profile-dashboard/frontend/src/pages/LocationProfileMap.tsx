import React from "react";
import {Button} from "antd";
import {useDispatch} from "react-redux";
import {setSelectMenu} from "@src/actions/MenuSelectAction";
const LocationProfileMap = (): JSX.Element => {

    const dispatch = useDispatch();

    return (
        <div>
            <Button>
                map버튼이다.
            </Button>
        </div>
    )
};

export const LocationProfileMapElement = React.createElement(
    LocationProfileMap,
);

export default LocationProfileMapElement
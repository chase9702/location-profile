import React from "react";
import {Button} from "antd";
const LocationProfileMap = (): JSX.Element => {
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
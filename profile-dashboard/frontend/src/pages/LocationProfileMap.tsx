import React from "react";
import {Button} from "antd";
import {useDispatch} from "react-redux";
import {setSelectMenu} from "@src/actions/MenuSelectAction";
import {withRouter} from "react-router-dom";

interface State {
}

interface Props {
}

const LocationProfileMap = (): React.ReactElement => {



        return (
            <div>
                <Button>
                    map버튼이다.
                </Button>
            </div>
        )

};


export default withRouter(LocationProfileMap)
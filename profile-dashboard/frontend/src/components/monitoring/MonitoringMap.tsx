import React, {useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import {useDispatch, useSelector} from "react-redux";
import {NotifyError} from "@src/components/common/Notification";
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import {deviceModel} from "@src/components/plugControl/types";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import Tabs from "antd/lib/tabs";
import DeviceTop100Table from "@src/components/plugControl/device/DeviceTop100Table";
import {StoreState} from "@src/reducers";
import {get} from "@src/api";
import TabPane from "antd/es/tabs/TabPane";
import Spin from "antd/lib/spin";
import {setSelectDate, setSelectDeviceGb, setSelectDeviceId} from "@src/actions/DeviceAction";
import DeviceChart from "@src/components/plugControl/device/DeviceChart";
import DatePicker from "antd/lib/date-picker";
import dayjs, {Dayjs} from 'dayjs';
import {encodeQueryData} from "@src/common/utils";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import Table from "antd/lib/table";
import {wrapTo} from "kepler.gl/actions";

interface Props {

}

const MonitoringMap = (props: Props): React.ReactElement => {


    return (
        <div>
            <CustomKeplerMap
                heightRatio={50}
                id={"monitoringMap"}
            />
        </div>
    )
};

export default MonitoringMap;

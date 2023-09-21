import React, {useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import {useDispatch, useSelector} from "react-redux";
import {NotifyError} from "@src/components/common/Notification";
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import {deviceGb} from "@src/components/plugControl/types";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import Tabs from "antd/lib/tabs";
import DeviceTop100Table from "@src/components/plugControl/DeviceTop100Table";
import {StoreState} from "@src/reducers";
import {get} from "@src/api";
import {encodeQueryData} from "@src/common/utils";
import TabPane from "antd/es/tabs/TabPane";
import Spin from "antd/lib/spin";
import {setSelectDeviceId} from "@src/actions/DeviceAction";
import DeviceTopTripChart from "@src/components/plugControl/DeviceTopTripChart";

interface Props {

}

const DeviceTopTab = (props: Props): React.ReactElement => {

    const dispatch = useDispatch();
    const selectedDeviceId = useSelector((state: StoreState) => state.device.selectedDeviceId)
    const [deviceLoading, setDeviceLoading] = useState(false);
    const [tripLoading, setTripLoading] = useState(false);
    const [deviceGbValue, setDeviceGbValue] = useState("TOTAL");
    const [clickGetData, setClickGetData] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState([]);
    const [tripInfo, setTripInfo] = useState([]);

    useEffect(() => {
        getDailyDeviceInfo("TOTAL")
    }, []);

    const handleSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        console.log(`selected ${value}`);
        setClickGetData(false);
        setDeviceGbValue(value);
    };

    const handleClickGetDeviceGbInfo = () => {
        console.log(deviceGbValue)
        getDailyDeviceInfo(deviceGbValue)
        setClickGetData(true)
        dispatch(setSelectDeviceId(''))
    }

    const getDailyDeviceInfo = (deviceGb) => {
        setDeviceLoading(true);
        get<any>(`/api/plug/device/top/${deviceGb}`)
            .then(jsonData => {
                setDeviceInfo(jsonData)
                setDeviceLoading(false);
            })
            .catch((error) => {
                NotifyError(error)
            })
    }

    useEffect(() => {
        if (selectedDeviceId !== '') {
            getDailyTripDeviceInfo()
        }
    }, [selectedDeviceId]);

    const getDailyTripDeviceInfo = () => {

        setTripLoading(true);
        const requestData = {
            deviceId: selectedDeviceId,
            deviceGb: deviceGbValue,
        };

        get<any>(`/api/plug/device/top/trip?` + encodeQueryData(requestData))
            .then(jsonData => {
                setTripInfo(jsonData)
                setTripLoading(false);
            })
            .catch((error) => {
                NotifyError(error)
            })
    }

    const renderTabTitle = () => {
        return `${selectedDeviceId}_디바이스 및 트립 차트`
    }

    const onChangeTab = (key: string) => {
        dispatch(setSelectDeviceId(''))
    };


    return (
        <div>
            <Card>
                <Row>
                    <Col span={2}>
                        <h3>제조사 선택 : </h3>
                    </Col>
                    <Col span={16}>
                        <Select
                            className={"h3-margin"}
                            showSearch
                            placeholder="제조사 선택"
                            optionFilterProp="children"
                            style={{
                                width: '50%', float: 'left',
                            }}
                            onChange={handleSelectChange}
                            defaultValue={'TOTAL'}
                            options={deviceGb}
                        >
                            {deviceGb.map((data, index) => {
                                return (
                                    <Select.Option value={data.value} key={index}>
                                        {data.value}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Button
                            className={"h3-margin"}
                            type={'primary'}
                            disabled={deviceLoading}
                            onClick={handleClickGetDeviceGbInfo}
                            style={{
                                float: "right",
                            }}
                        >
                            조회
                        </Button>
                    </Col>
                </Row>
            </Card>
            <Card>

                <Tabs defaultActiveKey="1"
                      activeKey={selectedDeviceId === '' ? "1" : "2"}
                      onChange={onChangeTab}
                >
                    <TabPane tab="제조사별 디바이스 Top 100" key="1">
                        <Spin spinning={deviceLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <DeviceTop100Table
                                deviceGb={deviceGbValue}
                                deviceInfoList={deviceInfo}
                                handleClickGetData={clickGetData}
                            />
                        </Spin>
                    </TabPane>
                    {selectedDeviceId === '' ?
                        <div></div> :
                        <TabPane tab={renderTabTitle()} key="2">
                            <Spin spinning={tripLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                                <DeviceTopTripChart
                                    selectedDeviceId={selectedDeviceId}
                                    deviceDataList={deviceInfo}
                                    tripDataList={tripInfo}
                                />
                            </Spin>
                        </TabPane>
                    }
                </Tabs>


            </Card>
        </div>
    )
};

export default DeviceTopTab;

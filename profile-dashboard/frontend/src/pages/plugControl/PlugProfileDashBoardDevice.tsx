import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {Button, Card, Col, Row, Select} from 'antd';
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import {store} from "@src/index";
import {addDataToMap, updateMap} from "kepler.gl/actions";
import {processCsvData} from "kepler.gl/processors";
import {get} from "@src/api";
import {NotifyError} from "@src/components/common/Notification";
import DeviceTop100Table from "@src/components/plugControl/DeviceTop100Table";
import {deviceGb} from "@src/components/plugControl/types";
import './plug.less';
import PageTitle from "@src/components/common/PageTitle";

interface State {
}

interface Props {
}

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const PlugProfileDashBoardDevice = (): React.ReactElement => {
    const [data, setData] = useState([]);
    const [homeMapData, setHomeMapData] = useState("");
    const [loading, setLoading] = useState(false);
    const [deviceGbValue, setDeviceGbValue] = useState("TOTAL");
    const [clickGetData, setClickGetData] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState([]);

    const testData = `no,eid,source,target,tunnel,geometry,source_lt,source_ln,target_lt,target_ln,length,reversed,eid_idx     
20720,166681831,1781121772,1781121730,yes,"LINESTRING (126.9889 37.5658, 126.9889 37.5658)",37.5658,126.9889,37.5658,126.9889,60.903,False,166681831 
20720,166681831,1781121772,1781121730,yes,"LINESTRING (126.9889 37.5658, 126.9889 37.5658)",37.5658,126.9889,37.5658,126.9889,60.903,False,166681831`

    const homeMapColumnName = 'no,eid,source,target,tunnel,geometry,source_lt,source_ln,target_lt,target_ln,length,reversed,eid_idx '
    const getHomeMapData = () => {
        get<string>("/api/home/~~~~")
            .then((jsonData) => {
                setHomeMapData(homeMapColumnName + jsonData)
            })
            .catch(error => {
                NotifyError(error)
            })
    }

    useEffect(() => {

        getDailyDeviceInfo("TOTAL")
        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }))

        store.dispatch(addDataToMap({
            datasets: {
                info: {
                    label: 'Seoul City CSV',
                    id: 'test_data_csv'
                },
                data: processCsvData(testData)
            }
        }));

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
    }

    const getDailyDeviceInfo = (deviceGb) => {
        setLoading(true);
        get<any>(`/api/plug/device/top/${deviceGb}`)
            .then(jsonData => {
                setDeviceInfo(jsonData)
                setLoading(false);
            })
            .catch((error) => {
                NotifyError(error)
            })
    }

    return (
        <div>
            <PageTitle
                title="Plug Device DashBoard"
                description={[
                    '디바이스별 위치정보를 바탕으로 한 데이터를 확인 할 수 있습니다.',
                    '플러그 디바이스의 Top 100 데이터를 확인 할 수 있습니다.',
                ]}
            />
            <Card>
                <CustomKeplerMap
                    heightRatio={70}
                    id={"deviceMap"}
                />
            </Card>
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
                            disabled={loading}
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
                <div>
                    <DeviceTop100Table
                        deviceGb={deviceGbValue}
                        deviceInfoList={deviceInfo}
                    />
                </div>
            </Card>
        </div>

    )

};

export default withRouter(PlugProfileDashBoardDevice)
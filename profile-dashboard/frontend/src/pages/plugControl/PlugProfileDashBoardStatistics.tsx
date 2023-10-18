import React, {useEffect, useState} from "react";
import Card from "antd/lib/card";
import Tabs from "antd/lib/tabs";
import Spin from "antd/lib/spin";
import PageTitle from "@src/components/common/PageTitle";
import {get} from "@src/api";
import PlugInterpolationDailyTable from "@src/components/plugControl/PlugInterpolationDailyTable";
import TabPane from "antd/es/tabs/TabPane";
import PlugInterpolationDailyChart from "@src/components/plugControl/PlugInterpolationDailyChart";
import PlugInterpolationMonthlyChart from "@src/components/plugControl/PlugInterpolationMonthlyChart";
import PlugInterpolationMonthlyTable from "@src/components/plugControl/PlugInterpolationMonthlyTable";
import PlugZeroGpsDailyChart from "@src/components/plugControl/PlugZeroGpsDailyChart";
import PlugZeroGpsDailyTable from "@src/components/plugControl/PlugZeroGpsDailyTable";
import PlugZeroGpsMonthlyChart from "@src/components/plugControl/PlugZeroGpsMonthlyChart";
import PlugZeroGpsMonthlyTable from "@src/components/plugControl/PlugZeroGpsMonthlyTable";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import PlugFirmwareVersion from "@src/components/plugControl/PlugFirmwareVersion";
import {Col, Row, Select} from "antd";
import {deviceModel} from "@src/components/plugControl/types";
import Button from "antd/lib/button";
import './plug.less';
import {NotifyError} from "@src/components/common/Notification";


interface State {
}

interface Props {
}

const PlugProfileDashBoardStatistics = (props: Props): React.ReactElement => {
    const [interpolationDailyData, setInterpolationDailyData] = useState([]);
    const [interpolationMonthlyData, setInterpolationMonthlyData] = useState([]);
    const [zeroGpsDailyData, setZeroGpsDailyData] = useState([]);
    const [zeroGpsMonthlyData, setZeroGpsMonthlyData] = useState([]);
    const [plugFirmwareVersionData, setPlugFirmwareVersionData] = useState([]);
    const [selectDeviceModelData, setSelectDeviceModelData] = useState<string>('TOTAL');

    const [plugFirmwareVersionLoading, setPlugFirmwareVersionLoading] = useState(true);
    const [interpolationMonthlyLoading, setInterpolationMonthlyLoading] = useState(true);
    const [interpolationDailyLoading, setInterpolationDailyLoading] = useState(true);
    const [zeroGpsDailyLoading, setZeroGpsDailyLoading] = useState(true);
    const [zeroGpsMonthlyLoading, setZeroGpsMonthlyLoading] = useState(true);
    const [fetchData, setFetchData] = useState(true);


    const interpolationDailyFetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-daily-info")
            .then((jsonData) => {
                console.log(jsonData)
                setInterpolationDailyData(jsonData)
            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
                setInterpolationDailyLoading(false);
            });
    };

    const interpolationTableMonthlyFetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-monthly-info")
            .then((jsonData) => {
                setInterpolationMonthlyData(jsonData)
            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
                setInterpolationMonthlyLoading(false);
            });
    };

    const zeroGpsTableDailyFetch = () => {
        get<[]>("/api/plug/statistic/zero-gps-trip-daily-info")
            .then((jsonData) => {
                console.log(jsonData)
                setZeroGpsDailyData(jsonData)
            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
                setZeroGpsDailyLoading(false);
            });
    };

    const zeroGpsMonthlyFetch = () => {
        get<[]>("/api/plug/statistic/zero-gps-trip-monthly-info")
            .then((jsonData) => {
                console.log(jsonData)
                setZeroGpsMonthlyData(jsonData)
            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
                setZeroGpsMonthlyLoading(false);
            });
    };

    const firmwareVersionFetch = () => {
        setPlugFirmwareVersionLoading(true);
        get<[]>(`/api/plug/statistic/firmware-version-info?dvc_mdl=${selectDeviceModelData}`)
            .then((jsonData) => {
                setPlugFirmwareVersionData(jsonData)
                console.log(jsonData)
            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
                setPlugFirmwareVersionLoading(false);
            });
    };

    useEffect(() => {
        interpolationDailyFetch();
        interpolationTableMonthlyFetch();
        zeroGpsTableDailyFetch();
        zeroGpsMonthlyFetch();
    }, []);

    useEffect(() => {
        if (fetchData) {
            firmwareVersionFetch();
            setFetchData(false);
        }
    }, [fetchData, selectDeviceModelData]);

    const handleDeviceModelChange = (value: any) => {
        console.log(value)
        setSelectDeviceModelData(value);
    };

    const handleFetchData = () => {
        setFetchData(true);
    };

    return (
        <div>
            <PageTitle
                title="Plug Statistics DashBoard"
                description={[
                    '일별/월별 에 대한 보간트립, Zero GPS를 제조사, 모델별로 확인 할 수 있습니다.',
                    '일자별 펌웨어 버젼을 확인해 업데이트 추이를 확인 할 수 있습니다.',
                ]}
            />
            <Card style={{padding: '10px'}}>
                <h3>
                    일별 보간트립 정보
                </h3>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="모델별 보간트립 그래프" key="1">
                        <Spin spinning={interpolationDailyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugInterpolationDailyChart interpolationDailyChartData={interpolationDailyData}/>
                        </Spin>
                    </TabPane>
                    <TabPane tab="모델별 보간트립 데이터" key="2">
                        <Spin spinning={interpolationDailyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugInterpolationDailyTable interpolationDailyTableData={interpolationDailyData}/>
                        </Spin>
                    </TabPane>
                </Tabs>
            </Card>
            <Card style={{padding: '10px'}}>
                <h3>
                    월별 보간트립 정보
                </h3>
                <Tabs defaultActiveKey="2">
                    <TabPane tab="모델별 보간트립 그래프" key="1">
                        <Spin spinning={interpolationMonthlyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugInterpolationMonthlyChart interpolationMonthlyChartData={interpolationMonthlyData}/>
                        </Spin>

                    </TabPane>
                    <TabPane tab="모델별 보간트립 데이터" key="2">
                        <Spin spinning={interpolationMonthlyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugInterpolationMonthlyTable interpolationMonthlyTableData={interpolationMonthlyData}/>
                        </Spin>
                    </TabPane>
                </Tabs>
            </Card>
            <Card style={{padding: '10px'}}>
                <h3>
                    일별 Zero 트립 정보
                </h3>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="모델별 Zero Gps 트립 그래프" key="1">
                        <Spin spinning={zeroGpsDailyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugZeroGpsDailyChart zeroGpsDailyChartData={zeroGpsDailyData}/>
                        </Spin>
                    </TabPane>
                    <TabPane tab="모델별 Zero Gps 트립 데이터" key="2">
                        <Spin spinning={zeroGpsDailyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugZeroGpsDailyTable zeroGpsDailyTableData={zeroGpsDailyData}/>
                        </Spin>
                    </TabPane>
                </Tabs>
            </Card>
            <Card style={{padding: '10px'}}>
                <h3>
                    월별 Zero 트립 정보
                </h3>
                <Tabs defaultActiveKey="2">
                    <TabPane tab="모델별 Zero 트립 그래프" key="1">
                        <Spin spinning={zeroGpsMonthlyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugZeroGpsMonthlyChart zeroGpsMonthlyChartData={zeroGpsMonthlyData}/>
                        </Spin>
                    </TabPane>
                    <TabPane tab="모델별 Zero 트립 데이터" key="2">
                        <Spin spinning={zeroGpsMonthlyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugZeroGpsMonthlyTable zeroGpsMonthlyTableData={zeroGpsMonthlyData}/>
                        </Spin>
                    </TabPane>
                </Tabs>
            </Card>
            <Card style={{padding: '10px'}}>
                <h3>
                    펌웨어 버전 정보
                </h3>
                <Row>
                    <Col span={4}>
                        <h4>제조사 : </h4>
                    </Col>
                    <Col span={8}>
                        <Select
                            showSearch
                            className={"h3-margin"}
                            placeholder="제조사 선택"
                            optionFilterProp="children"
                            style={{width: '100%'}}
                            value={selectDeviceModelData}
                            onChange={handleDeviceModelChange}
                            options={deviceModel}
                        >
                            {deviceModel.map((data, index) => {
                                return (
                                    <Select.Option value={data.value} key={index}>
                                        {data.value}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Button
                            className={"h3-margin"}
                            type={'primary'}
                            // disabled={deviceLoading}
                            onClick={handleFetchData}
                            style={{
                                float: "right",
                            }}
                        >
                            조회
                        </Button>
                    </Col>
                </Row>
                <Spin spinning={plugFirmwareVersionLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                    <PlugFirmwareVersion plugFirmwareVersionData={plugFirmwareVersionData}/>
                </Spin>
            </Card>
        </div>
    )
};

export default PlugProfileDashBoardStatistics;



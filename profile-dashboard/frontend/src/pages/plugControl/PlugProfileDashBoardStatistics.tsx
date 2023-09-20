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


interface State {
}

interface Props {
}

const PlugProfileDashBoardStatistics = (props: Props): React.ReactElement => {
    const [interpolationDailyData, setInterpolationDailyData] = useState([]);
    const [interpolationMonthlyData, setInterpolationMonthlyData] = useState([]);
    const [zeroGpsDailyData, setZeroGpsDailyData] = useState([]);
    const [zeroGpsMonthlyData, setZeroGpsMonthlyData] = useState([]);
    const [interpolationMonthlyLoading, setInterpolationMonthlyLoading] = useState(true);
    const [interpolationDailyLoading, setInterpolationDailyLoading] = useState(true);
    const [zeroGpsDailyLoading, setZeroGpsDailyLoading] = useState(true);
    const [zeroGpsMonthlyLoading, setZeroGpsMonthlyLoading] = useState(true);


    const interpolationDailyFetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-daily-info")
            .then((jsonData) => {
                console.log(jsonData)
                setInterpolationDailyData(jsonData)
            })
            .finally(() => {
                setInterpolationDailyLoading(false);
            });
    };

    const interpolationTableMonthlyFetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-monthly-info")
            .then((jsonData1) => {
                setInterpolationMonthlyData(jsonData1)
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
            .finally(() => {
                setZeroGpsMonthlyLoading(false); // 로딩을 완료로 설정
            });
    };

    useEffect(() => {
        interpolationDailyFetch();
        interpolationTableMonthlyFetch();
        zeroGpsTableDailyFetch();
        zeroGpsMonthlyFetch();
    }, []);

    // @ts-ignore
    return (
        <div>
            <PageTitle
                title="Plug Statistics DashBoard"
                description={[
                    '일별/월별 에 대한 보간트립, Zero GPS를 제조사, 모델별로 확인할 수 있습니다.',
                    '일자별 펌웨어 버젼을 확인해 업데이트 추이를 확인하실 수 있습니다.',
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
                    일별 Zero Gps 정보
                </h3>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="모델별 Zero Gps 그래프" key="1">
                        <Spin spinning={zeroGpsDailyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugZeroGpsDailyChart zeroGpsDailyChartData={zeroGpsDailyData}/>
                        </Spin>
                    </TabPane>
                    <TabPane tab="모델별 Zero Gps 데이터" key="2">
                        <Spin spinning={zeroGpsDailyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugZeroGpsDailyTable zeroGpsDailyTableData={zeroGpsDailyData}/>
                        </Spin>
                    </TabPane>
                </Tabs>
            </Card>
            <Card style={{padding: '10px'}}>
                <h3>
                    월별 Zero Gps 정보
                </h3>
                <Tabs defaultActiveKey="2">
                    <TabPane tab="모델별 Zero Gps 그래프" key="1">
                        <Spin spinning={zeroGpsMonthlyLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugZeroGpsMonthlyChart zeroGpsMonthlyChartData={zeroGpsMonthlyData}/>
                        </Spin>
                    </TabPane>
                    <TabPane tab="모델별 Zero Gps 데이터" key="2">
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
                <PlugFirmwareVersion/>
            </Card>
        </div>
    )
};

export default PlugProfileDashBoardStatistics;



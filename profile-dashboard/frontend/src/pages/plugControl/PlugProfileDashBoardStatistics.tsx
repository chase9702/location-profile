import React, {useEffect, useState} from "react";
import {Card, DatePicker, Spin, Tabs} from "antd";
import PageTitle from "@src/components/common/PageTitle";
import {get, post} from "@src/api";
import type {RangePickerProps} from 'antd/es/date-picker';
import PlugInterpolationDailyTable from "@src/components/plugControl/PlugInterpolationDailyTable";
import TabPane from "antd/es/tabs/TabPane";
import PlugInterpolationDailyChart from "@src/components/plugControl/PlugInterpolationDailyChart";
import PlugInterpolationMonthlyChart from "@src/components/plugControl/PlugInterpolationMonthlyChart";
import PlugInterpolationMonthlyTable from "@src/components/plugControl/PlugInterpolationMonthlyTable";
import PlugZeroGpsDailyChart from "@src/components/plugControl/PlugZeroGpsDailyChart";
import PlugZeroGpsDailyTable from "@src/components/plugControl/PlugZeroGpsDailyTable";
import PlugZeroGpsMonthlyChart from "@src/components/plugControl/PlugZeroGpsMonthlyChart";
import PlugZeroGpsMonthlyTable from "@src/components/plugControl/PlugZeroGpsMonthlyTable";
import {LoadingOutlined} from "@ant-design/icons";


interface State {
}

interface Props {
}

const PlugProfileDashBoardStatistics = (props: Props): React.ReactElement => {
    const [interpolationDailyData, setInterpolationDailyChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    const interpolationDailyFetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-daily-info")
            .then((jsonData) => {
                console.log(jsonData)
                setInterpolationDailyChartData(jsonData)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        interpolationDailyFetch();
    }, []);

    // @ts-ignore
    return (
        <div>
            <PageTitle
                title="Plug Profile 통계 DashBoard"
                // description={[
                //     'Plug 정보를 확인 할 수 있습니다.',
                // ]}

            />
            <Card style={{padding: '10px'}}>
                <h3>
                    일별 보간트립 정보
                </h3>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="모델별 보간트립 그래프" key="1">
                        <Spin spinning={loading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <PlugInterpolationDailyChart interpolationDailyChartData={interpolationDailyData}/>
                        </Spin>
                    </TabPane>
                    <TabPane tab="모델별 보간트립 데이터" key="2">
                        <Spin spinning={loading} indicator={<LoadingOutlined/>} tip="로딩 중...">
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
                        <PlugInterpolationMonthlyChart/>
                    </TabPane>
                    <TabPane tab="모델별 보간트립 데이터" key="2">
                        <PlugInterpolationMonthlyTable/>
                    </TabPane>
                </Tabs>
            </Card>
            <Card style={{padding: '10px'}}>
                <h3>
                    일별 Zero Gps 정보
                </h3>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="모델별 Zero Gps 그래프" key="1">
                        <PlugZeroGpsDailyChart/>
                    </TabPane>
                    <TabPane tab="모델별 Zero Gps 데이터" key="2">
                        <PlugZeroGpsDailyTable/>
                    </TabPane>
                </Tabs>
            </Card>
            <Card style={{padding: '10px'}}>
                <h3>
                    월별 Zero Gps 정보
                </h3>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="모델별 Zero Gps 그래프" key="1">
                        <PlugZeroGpsMonthlyChart/>
                    </TabPane>
                    <TabPane tab="모델별 Zero Gps 데이터" key="2">
                        <PlugZeroGpsMonthlyTable/>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
};

export default PlugProfileDashBoardStatistics;



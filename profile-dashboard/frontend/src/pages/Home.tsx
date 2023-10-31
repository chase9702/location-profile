import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import Line from '@ant-design/plots/lib/components/line';
import Card from 'antd/lib/card';
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import {store} from "@src/index";
import {addDataToMap, updateMap} from "kepler.gl/actions";
import {processCsvData} from "kepler.gl/processors";
import {get} from "@src/api";
import PageTitle from "@src/components/common/PageTitle";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import Spin from "antd/lib/spin";
import {useSelector} from "react-redux";
import {StoreState} from "@src/reducers";


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

const Home = (): React.ReactElement => {

    const accessToken = useSelector((state: StoreState) => state.auth.accessToken)
    const [homeDeviceCountData, setHomeDeviceCountData] = useState([]);
    const [homeDeviceLoading, setHomeDeviceLoading] = useState(true);

    useEffect(() => {
        if (accessToken !== null) {
            homeDeviceCountFetch();
        }
    }, [accessToken]);

    const homeDeviceCountFetch = () => {
        get<[]>("/api/home/device-count-info")
            .then((jsonData) => {
                console.log(jsonData)
                setHomeDeviceCountData(jsonData)
            })
            .finally(() => {
                setHomeDeviceLoading(false);
            });
    };

    const homeDeviceCountConfig = {
        data: homeDeviceCountData,
        xField: 'bs_dt',
        yField: 'dvc_count',
        seriesField: 'dvc_gb',
        yAxis: {
            label: {
                content: (item) => `${item.dvc_count}`, // 각 데이터의 값을 라벨로 표시
            },
        },
        legend: {
            position: 'top',
        },
        smooth: true,

        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };

    const testData = `no,eid,source,target,tunnel,geometry,source_lt,source_ln,target_lt,target_ln,length,reversed,eid_idx 
    20689,166681831,1781121730,1781121772,yes,"LINESTRING (126.2859336000000070 34.4983530000000016, 126.2855303999999990 34.4987884000000022)",34.498353,126.2859336,34.4987884,126.2855304,60.903,True,166681831
20720,166681831,1781121772,1781121730,yes,"LINESTRING (126.2855303999999990 34.4987884000000022, 126.2859336000000070 34.4983530000000016)",34.4987884,126.2855304,34.498353,126.2859336,60.903,False,166681831
22173,550315177,2678542499,6743633942,yes,"LINESTRING (126.7193527000000017 34.3770679000000001, 126.7196267000000063 34.3762836000000007)",34.3770679,126.7193527,34.3762836,126.7196267,90.763,False,550315177
22579,262304510,2679647534,2679647531,yes,"LINESTRING (126.6566722999999968 34.3845864999999975, 126.6563412999999940 34.3845444999999970)",34.3845865,126.6566723,34.3845445,126.6563413,30.731,True,262304510`

    useEffect(() => {
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


    return (
        <div>
            <PageTitle
                title="Location Intelligence (LI)"
                description={[
                    'LI는 캐롯의 위치정보를 분석할 수 있는 플랫폼입니다.',
                    '플러그관제를 하실 수 있습니다.',
                    '위치정보 데이터들을 이용하여 다양한 인사이트를 얻을 수 있습니다.',
                ]}
            />

            <CustomKeplerMap
                heightRatio={70}
                id={"homeMap"}
            />

            <Card style={{padding: '10px'}}>
                <div>
                    <h3>
                        월별 디바이스 현황
                    </h3>
                    <Spin spinning={homeDeviceLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                        <Line {...homeDeviceCountConfig} />
                    </Spin>
                </div>
            </Card>
        </div>

    )

};

export default withRouter(Home)
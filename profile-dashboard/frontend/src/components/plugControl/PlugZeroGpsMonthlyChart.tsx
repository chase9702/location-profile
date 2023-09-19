import React, {useEffect, useState} from "react";
import {get} from "@src/api";
import _ from 'lodash';
import {Column} from "@ant-design/plots";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

interface Props {

}

const PlugZeroGpsMonthlyChart = (props: Props): React.ReactElement => {
    const [zeroGpsMonthlyData, setZeroGpsMonthlyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        zeroGpsTableMonthlyChartFetch();
    }, []);

    const zeroGpsTableMonthlyChartFetch = () => {
        get<[]>("/api/plug/statistic/zero-gps-trip-monthly-info")
            .then((jsonData) => {
                console.log(jsonData)
                setZeroGpsMonthlyData(jsonData)
            })
            .finally(() => {
                setLoading(false); // 로딩을 완료로 설정
            });
    };

    const zeroGpsMonthlyGroupData = _.groupBy(zeroGpsMonthlyData, (item) => `${item.dvcMdl}-${item.bsDt}`);

    const zeroGpsMonthlyChartDataResult = _.map(zeroGpsMonthlyGroupData, (group) => {
        const sumTotalcnt = _.sumBy(group, 'sumTotalTripCnt');
        const sumZeroTripCnt = _.sumBy(group, 'sumZeroTripCnt');
        const sumZeroTripRt = sumTotalcnt !== 0 ? (sumZeroTripCnt / sumTotalcnt) * 100 : 0;

        return {
            dvc_Mdl: group[0].dvcMdl,
            bsDt: group[0].bsDt,
            sumZeroTripRt: parseFloat(sumZeroTripRt.toFixed(2)), // 숫자로 변환
        };
    });

    console.log(zeroGpsMonthlyChartDataResult)

    const zeroGpsMonthlyChartConfig = {
        data: zeroGpsMonthlyChartDataResult,
        xField: 'bsDt',
        yField: 'sumZeroTripRt',
        seriesField: 'dvc_Mdl',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        label: {
            position: 'middle',
            content: (item) => `${item.sumZeroTripRt}`, // 각 데이터의 값을 라벨로 표시
            style: {
                fill: '#000', // 라벨 색상 설정
                fontSize: 12,
            },
        },
    };

    return (
        <div>
            <Spin spinning={loading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                <Column {...zeroGpsMonthlyChartConfig} />
            </Spin>
        </div>
    )
};
export default PlugZeroGpsMonthlyChart;

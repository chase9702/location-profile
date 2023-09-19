import React, {useEffect, useState} from "react";
import {get} from "@src/api";
import _ from 'lodash';
import {Column} from "@ant-design/plots";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

interface Props {

}

const PlugInterpolationMonthlyChart = (props: Props): React.ReactElement => {
    const [interpolationMonthlyChartData, setInterpolationMonthlyChartData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        interpolationTableMonthlyChartFetch();
    }, []);

    const interpolationTableMonthlyChartFetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-monthly-info")
            .then((jsonData1) => {
                setInterpolationMonthlyChartData(jsonData1)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const interpolationMonthlyGroupData = _.groupBy(interpolationMonthlyChartData, (item) => `${item.dvcMdl}-${item.bsDt}`);

    const interpolationMonthlyChartDataResult = _.map(interpolationMonthlyGroupData, (group) => {
        const sumTotalTripCnt = _.sumBy(group, 'sumTotalTripCnt');
        const sumInterpolationTripCnt = _.sumBy(group, 'sumInterpolationTripCnt');

        const sumInterpolationTripRt = sumTotalTripCnt !== 0 ? (sumInterpolationTripCnt / sumTotalTripCnt) * 100 : 0;

        return {
            dvcMdl: group[0].dvcMdl,
            bsDt: group[0].bsDt,
            sumInterpolationTripRt: parseFloat(sumInterpolationTripRt.toFixed(2)), // 숫자로 변환
        };
    });
    console.log("monthly")
    console.log(interpolationMonthlyChartDataResult)

    const interpolationMonthlyChartConfig = {
        data: interpolationMonthlyChartDataResult,
        xField: 'bsDt',
        yField: 'sumInterpolationTripRt',
        seriesField: 'dvcMdl',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        label: {
            position: 'middle',
            content: (item) => `${item.sumInterpolationTripRt}`, // 각 데이터의 값을 라벨로 표시
            style: {
                fill: '#000', // 라벨 색상 설정
                fontSize: 12,
            },
        },
    };
    return (
        <div>
            <Spin spinning={loading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                <Column {...interpolationMonthlyChartConfig} />
            </Spin>

        </div>
    )
};
export default PlugInterpolationMonthlyChart;
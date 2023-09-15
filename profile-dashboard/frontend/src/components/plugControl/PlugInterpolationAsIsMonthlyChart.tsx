import React, {useEffect, useState} from "react";
import {get} from "@src/api";
import _ from 'lodash';
import {Column} from "@ant-design/plots";

interface Props {

}

const PlugInterpolationAsIsMonthlyChart = (props: Props): React.ReactElement => {
    const [interpolationMonthlyChartData, setInterpolationMonthlyChartData] = useState([]);
    const interpolationMonthlyGroupData = _.groupBy(interpolationMonthlyChartData, (item) => `${item.dvc_mdl}-${item.bs_dt}`);


    useEffect(() => {
        interpolationTableMonthlyChartFetch();
    }, []);

    const interpolationTableMonthlyChartFetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-monthly-info?ctgry=02")
            .then((jsonData1) => {
                setInterpolationMonthlyChartData(jsonData1)
            })
    };

    const interpolationMonthlyChartDataResult = _.map(interpolationMonthlyGroupData, (group) => {
        const sumTotalcnt = _.sumBy(group, 'sum_total_trip_cnt');
        const sum02TripCnt = _.sumBy(group, 'sum_02_trip_cnt');

        const ratio = sumTotalcnt !== 0 ? (sum02TripCnt / sumTotalcnt) * 100 : 0;

        return {
            dvc_mdl: group[0].dvc_mdl,
            bs_dt: group[0].bs_dt,
            trip_rt: parseFloat(ratio.toFixed(2)), // 숫자로 변환
        };
    });

    const interpolationMonthlyChartConfig = {
        data: interpolationMonthlyChartDataResult,
        xField: 'bs_dt',
        yField: 'trip_rt',
        seriesField: 'dvc_mdl',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        label: {
            position: 'middle',
            content: (item) => `${item.trip_rt}`, // 각 데이터의 값을 라벨로 표시
            style: {
                fill: '#000', // 라벨 색상 설정
                fontSize: 12,
            },
        },
    };

    console.log("Monthly data" + interpolationMonthlyChartDataResult);

    return (
        <div>
            <Column {...interpolationMonthlyChartConfig} />
        </div>
    )
};
export default PlugInterpolationAsIsMonthlyChart;
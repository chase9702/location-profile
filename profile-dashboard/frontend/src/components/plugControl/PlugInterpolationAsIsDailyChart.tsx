import React, {useEffect, useState} from "react";
import {get} from "@src/api";
import _ from 'lodash';
import {Column} from "@ant-design/plots";

interface Props {

}

const PlugInterpolationAsIsDailyChart = (props: Props): React.ReactElement => {
    const [interpolationDailyChartData, setInterpolationDailyChartData] = useState([]);
    const [interpolationDailyChartRequestData, setInterpolationDailyChartRequestData] = useState([]);

    useEffect(() => {
        interpolationTableDailyChartFetch();
    }, []);

    const interpolationTableDailyChartFetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-daily-info?ctgry=02")
            .then((jsonData) => {
                console.log(jsonData)
                setInterpolationDailyChartData(jsonData)
            })
    };

    const interpolationDailyGroupData = _.groupBy(interpolationDailyChartData, (item) => `${item.dvc_mdl}-${item.bs_dt}`);

    const interpolationDailyChartDataResult = _.map(interpolationDailyGroupData, (group) => {
        const sumTotalcnt = _.sumBy(group, 'sum_total_trip_cnt');
        const sum02TripCnt = _.sumBy(group, 'sum_02_trip_cnt');
        const ratio = sumTotalcnt !== 0 ? (sum02TripCnt / sumTotalcnt) * 100 : 0;

        return {
            dvc_mdl: group[0].dvc_mdl,
            bs_dt: group[0].bs_dt,
            trip_rt: parseFloat(ratio.toFixed(2)), // 숫자로 변환
        };
    });

    console.log(interpolationDailyChartDataResult)

    const interpolationDailyChartConfig = {
        data: interpolationDailyChartDataResult,
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

    const [ctgryFilter, setCtgryFilter] = useState(null);

    return (
        <div>
            <Column {...interpolationDailyChartConfig} />
        </div>
    )
};
export default PlugInterpolationAsIsDailyChart;

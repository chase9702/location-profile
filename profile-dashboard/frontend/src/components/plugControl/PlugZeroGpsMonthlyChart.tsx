import React from "react";
import _ from 'lodash';
import Column from "@ant-design/plots/lib/components/column";

interface Props {

}

const PlugZeroGpsMonthlyChart = (props: { zeroGpsMonthlyChartData: any[] }): React.ReactElement => {

    const {zeroGpsMonthlyChartData} = props;
    const zeroGpsMonthlyGroupData = _.groupBy(zeroGpsMonthlyChartData, (item) => `${item.dvc_mdl}-${item.bs_dt}`);

    const zeroGpsMonthlyChartDataResult = _.map(zeroGpsMonthlyGroupData, (group) => {
        const sumTotalCnt = _.sumBy(group, 'sum_total_trip_cnt');
        const sumZeroTripCnt = _.sumBy(group, 'sum_zero_trip_cnt');
        const sumZeroTripRt = sumTotalCnt !== 0 ? (sumZeroTripCnt / sumTotalCnt) * 100 : 0;

        return {
            dvc_mdl: group[0].dvc_mdl,
            bs_dt: group[0].bs_dt,
            sum_zero_trip_rt: parseFloat(sumZeroTripRt.toFixed(2)), // 숫자로 변환
        };
    }).sort((a, b) => a.dvc_mdl.localeCompare(b.dvc_mdl));

    console.log(zeroGpsMonthlyChartDataResult)

    const zeroGpsMonthlyChartConfig = {
        data: zeroGpsMonthlyChartDataResult,
        xField: 'bs_dt',
        yField: 'sum_zero_trip_rt',
        xAxis: {
            title: {
                text: '일자', 
            },
        },
        yAxis: {
            title: {
                text: 'Zero 트립 비율', 
            },
        },
        seriesField: 'dvc_mdl',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        label: {
            position: 'middle',
            content: (item) => `${item.sum_zero_trip_rt}`, // 각 데이터의 값을 라벨로 표시
            style: {
                fill: '#000', // 라벨 색상 설정
                fontSize: 12,
            },
        },
    };

    return (
        <div>
            <Column {...zeroGpsMonthlyChartConfig} />
        </div>
    )
};
export default PlugZeroGpsMonthlyChart;

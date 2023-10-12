import React from "react";
import _ from 'lodash';
import Column from "@ant-design/plots/lib/components/column";

interface Props {

}

const PlugZeroGpsDailyChart = (props: { zeroGpsDailyChartData: any[] }): React.ReactElement => {

    const { zeroGpsDailyChartData } = props;
    const zeroGpsDailyGroupData = _.groupBy(zeroGpsDailyChartData, (item) => `${item.dvc_mdl}-${item.bs_dt}`);

    const zeroGpsDailyChartDataResult = _.map(zeroGpsDailyGroupData, (group) => {
        const sum_total_trip_cnt = _.sumBy(group, 'sum_total_trip_cnt');
        const sum_zero_trip_cnt = _.sumBy(group, 'sum_zero_trip_cnt');
        const sum_zero_trip_rt = sum_total_trip_cnt !== 0 ? (sum_zero_trip_cnt / sum_total_trip_cnt) * 100 : 0;

        return {
            dvc_mdl: group[0].dvc_mdl,
            bs_dt: group[0].bs_dt,
            sum_zero_trip_rt: parseFloat(sum_zero_trip_rt.toFixed(2)),
        };
    }).sort((a, b) => a.dvc_mdl.localeCompare(b.dvc_mdl));

    const zeroGpsDailyChartConfig = {
        data: zeroGpsDailyChartDataResult,
        xField: 'bs_dt',
        yField: 'sum_zero_trip_rt',
        xAxis: {
            title: {
                text: '일자', 
            },
        },
        yAxis: {
            title: {
                text: 'Zero 트립 비율(%)',
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
                <Column {...zeroGpsDailyChartConfig} />
        </div>
    )
};
export default PlugZeroGpsDailyChart;

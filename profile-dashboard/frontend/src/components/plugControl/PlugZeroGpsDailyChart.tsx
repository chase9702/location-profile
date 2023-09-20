import React from "react";
import _ from 'lodash';
import Column from "@ant-design/plots/lib/components/column";

interface Props {

}

const PlugZeroGpsDailyChart = (props: { zeroGpsDailyChartData: any[] }): React.ReactElement => {

    const { zeroGpsDailyChartData } = props;
    const zeroGpsDailyGroupData = _.groupBy(zeroGpsDailyChartData, (item) => `${item.dvcMdl}-${item.bsDt}`);

    const zeroGpsDailyChartDataResult = _.map(zeroGpsDailyGroupData, (group) => {
        const sumTotalTripCnt = _.sumBy(group, 'sumTotalTripCnt');
        const sumZeroTripCnt = _.sumBy(group, 'sumZeroTripCnt');
        const sumZeroTripRt = sumTotalTripCnt !== 0 ? (sumZeroTripCnt / sumTotalTripCnt) * 100 : 0;

        return {
            dvcMdl: group[0].dvcMdl,
            bsDt: group[0].bsDt,
            sumZeroTripRt: parseFloat(sumZeroTripRt.toFixed(2)),
        };
    });

    console.log(zeroGpsDailyChartDataResult)

    const zeroGpsDailyChartConfig = {
        data: zeroGpsDailyChartDataResult,
        xField: 'bsDt',
        yField: 'sumZeroTripRt',
        seriesField: 'dvcMdl',
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
                <Column {...zeroGpsDailyChartConfig} />
        </div>
    )
};
export default PlugZeroGpsDailyChart;

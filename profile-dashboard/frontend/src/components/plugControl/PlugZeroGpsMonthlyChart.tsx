import React from "react";
import _ from 'lodash';
import Column from "@ant-design/plots/lib/components/column";

interface Props {

}

const PlugZeroGpsMonthlyChart = (props: { zeroGpsMonthlyChartData: any[] }): React.ReactElement => {

    const {zeroGpsMonthlyChartData} = props;
    const zeroGpsMonthlyGroupData = _.groupBy(zeroGpsMonthlyChartData, (item) => `${item.dvcMdl}-${item.bsDt}`);

    const zeroGpsMonthlyChartDataResult = _.map(zeroGpsMonthlyGroupData, (group) => {
        const sumTotalCnt = _.sumBy(group, 'sumTotalTripCnt');
        const sumZeroTripCnt = _.sumBy(group, 'sumZeroTripCnt');
        const sumZeroTripRt = sumTotalCnt !== 0 ? (sumZeroTripCnt / sumTotalCnt) * 100 : 0;

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
            <Column {...zeroGpsMonthlyChartConfig} />
        </div>
    )
};
export default PlugZeroGpsMonthlyChart;

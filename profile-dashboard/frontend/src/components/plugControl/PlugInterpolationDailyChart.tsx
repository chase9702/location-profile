import React from "react";
import _ from 'lodash';
import {Column} from "@ant-design/plots";


interface Props {
}

const PlugInterpolationDailyChart = (props: { interpolationDailyChartData: any[] }): React.ReactElement => {

    const { interpolationDailyChartData } = props;
    const interpolationDailyGroupData = _.groupBy(interpolationDailyChartData, (item) => `${item.dvcGb}-${item.bsDt}`);

    const interpolationDailyChartDataResult = _.map(interpolationDailyGroupData, (group) => {
        const sumTotalcnt = _.sumBy(group, 'sumTotalTripCnt');
        const sumInterpolationTripCnt = _.sumBy(group, 'sumInterpolationTripCnt');
        const tripInterpolationRt = sumTotalcnt !== 0 ? (sumInterpolationTripCnt / sumTotalcnt) * 100 : 0;

        return {
            dvcMdl: group[0].dvcMdl,
            bsDt: group[0].bsDt,
            sumInterpolationTripCnt: parseFloat(tripInterpolationRt.toFixed(2)), // 숫자로 변환
        };
    });

    console.log(interpolationDailyChartDataResult)

    const interpolationDailyChartConfig = {
        data: interpolationDailyChartDataResult,
        xField: 'bsDt',
        yField: 'sumInterpolationTripCnt',
        seriesField: 'dvcMdl',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        label: {
            position: 'middle',
            content: (item) => `${item.sumInterpolationTripCnt}`,
            style: {
                fill: '#000',
                fontSize: 12,
            },
        },
    };

    return (
        <div>
            {/*<Spin spinning={loading} indicator={<LoadingOutlined/>} tip="로딩 중...">*/}
                <Column {...interpolationDailyChartConfig} />
            {/*</Spin>*/}
        </div>
    )
};
export default PlugInterpolationDailyChart;

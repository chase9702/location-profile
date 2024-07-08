import React from 'react';
import _ from 'lodash';
import Column from '@ant-design/plots/lib/components/column';
const PlugInterpolationMonthlyChart = (props: {
  interpolationMonthlyChartData: any[];
}): React.ReactElement => {
  const { interpolationMonthlyChartData } = props;
  const interpolationMonthlyGroupData = _.groupBy(
    interpolationMonthlyChartData,
    (item) => `${item.dvc_mdl}-${item.bs_dt}`
  );

  const interpolationMonthlyChartDataResult = _.map(
    interpolationMonthlyGroupData,
    (group) => {
      const sumTotalTripCnt = _.sumBy(group, 'sum_total_trip_cnt');
      const sumInterpolationTripCnt = _.sumBy(
        group,
        'sum_interpolation_trip_cnt'
      );
      const sumInterpolationTripRt =
        sumTotalTripCnt !== 0
          ? (sumInterpolationTripCnt / sumTotalTripCnt) * 100
          : 0;

      return {
        dvc_mdl: group[0].dvc_mdl,
        bs_dt: group[0].bs_dt,
        sum_interpolation_trip_rt: parseFloat(
          sumInterpolationTripRt.toFixed(2)
        ), // 숫자로 변환
      };
    }
  ).sort((a, b) => a.dvc_mdl.localeCompare(b.dvc_mdl));

  console.log(interpolationMonthlyChartDataResult);

  const interpolationMonthlyChartConfig = {
    data: interpolationMonthlyChartDataResult,
    xField: 'bs_dt',
    yField: 'sum_interpolation_trip_rt',
    xAxis: {
      title: {
        text: '일자',
      },
    },
    yAxis: {
      title: {
        text: '보간 트립 비율(%)',
      },
    },
    seriesField: 'dvc_mdl',
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    label: {
      position: 'middle',
      content: (item) => `${item.sum_interpolation_trip_rt}`, // 각 데이터의 값을 라벨로 표시
      style: {
        fill: '#000', // 라벨 색상 설정
        fontSize: 12,
      },
    },
  };
  return (
    <div>
      <Column {...interpolationMonthlyChartConfig} />
    </div>
  );
};
export default PlugInterpolationMonthlyChart;

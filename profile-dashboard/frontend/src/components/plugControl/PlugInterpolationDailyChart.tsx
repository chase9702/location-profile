import React from 'react';
import _ from 'lodash';
import Column from '@ant-design/plots/lib/components/column';
import { numberFormat } from '@src/common/utils';
const PlugInterpolationDailyChart = (props: {
  interpolationDailyChartData: any[];
}): React.ReactElement => {
  const { interpolationDailyChartData } = props;
  const interpolationDailyGroupData = _.groupBy(
    interpolationDailyChartData,
    (item) => `${item.dvc_mdl}-${item.bs_dt}`
  );

  const interpolationDailyChartDataResult = _.map(
    interpolationDailyGroupData,
    (group) => {
      const sumTotalcnt = _.sumBy(group, 'sum_total_trip_cnt');
      const sum_interpolation_trip_cnt = _.sumBy(
        group,
        'sum_interpolation_trip_cnt'
      );
      const tripInterpolationRt =
        sumTotalcnt !== 0
          ? (sum_interpolation_trip_cnt / sumTotalcnt) * 100
          : 0;

      return {
        dvc_mdl: group[0].dvc_mdl,
        bs_dt: group[0].bs_dt,
        sum_interpolation_trip_cnt: parseFloat(tripInterpolationRt.toFixed(2)), // 숫자로 변환
      };
    }
  ).sort((a, b) => a.dvc_mdl.localeCompare(b.dvc_mdl));

  const interpolationDailyChartConfig = {
    data: interpolationDailyChartDataResult,
    xField: 'bs_dt',
    yField: 'sum_interpolation_trip_cnt',
    xAxis: {
      title: {
        text: '일자',
      },
    },
    yAxis: {
      title: {
        text: '보간 트립 비율(%)',
      },
      label: {
        formatter: (text) => numberFormat(text),
      },
    },
    seriesField: 'dvc_mdl',
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    slider: {
      start: 0.1,
      end: 0.2,
    },
    label: {
      position: 'middle',
      content: (item) => `${item.sum_interpolation_trip_cnt}`,
      style: {
        fill: '#000',
        fontSize: 12,
      },
    },
  };

  return (
    <div>
      <Column {...interpolationDailyChartConfig} />
    </div>
  );
};
export default PlugInterpolationDailyChart;

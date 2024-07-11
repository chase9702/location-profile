import React, { useEffect, useState, useMemo } from 'react';
import { Scatter, Violin } from '@ant-design/plots';
import TimePicker from 'antd/lib/time-picker';
import DatePicker from 'antd/lib/date-picker';
import { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { Button, Col, Row } from 'antd';
import Select from 'antd/lib/select';
import {
  bbiBehaviorFilter,
  bbiUnitFilter,
} from '@src/components/plugControl/types';
import { setSelectDeviceGb } from '@src/actions/DeviceAction';
import { get } from '@src/api';
import { encodeQueryData } from '@src/common/utils';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import Spin from 'antd/lib/spin';
import dayjs, { Dayjs } from 'dayjs';
import { now } from 'moment/moment';
import Plot from 'react-plotly.js';

interface Props {}

const MonitoringBbiChart = (props: Props): React.ReactElement => {
  const { RangePicker } = DatePicker;
  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedTime, setSelectedTime] = useState(dayjs(now()));
  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(
    dayjs().subtract(7, 'day')
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(
    dayjs().subtract(1, 'day')
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [bbiDetectionLoading, setBbiDetectionLoading] = useState(false);
  const [bbiDetectionData, setBbiDetectionData] = useState<any[]>([]);
  const [bbiTripValue, setBbiTripValue] = useState('trip_id');
  const [bbiBehaviorValue, setBbiBehaviorValue] = useState(null);

  useEffect(() => {
    bbiDetectionFetch();
  }, []);

  const bbiDetectionFetch = (
    queryString = `hour=${selectedTime.format(
      'HH'
    )}&start_date=${selectedStartDate.format(
      'YYYYMMDD'
    )}&end_date=${selectedEndDate.format('YYYYMMDD')}`
  ) => {
    setBbiDetectionLoading(true);
    get<[]>(`/api/monitoring/bbi/detection/?${queryString}`)
      .then((jsonData) => {
        console.log(jsonData);
        const transformedData = transformData(jsonData);
        console.log(transformedData);
        const plotlyData = transformDataToPlotly(transformedData);
        console.log(plotlyData);
        setBbiDetectionData(plotlyData);
      })
      .finally(() => {
        setBbiDetectionLoading(false);
      });
  };

  const transformData = (data) => {
    if (!data) {
      return [];
    }

    const transformedData = data.flatMap(
      (item: { part_dt: any; sac: any; sdc: any; ssp: any; sst: any }) => [
        { 일자: item.part_dt, behavior: '급가속', count: item.sac },
        { 일자: item.part_dt, behavior: '급감속', count: item.sdc },
        { 일자: item.part_dt, behavior: '급정지', count: item.ssp },
        { 일자: item.part_dt, behavior: '급출발', count: item.sst },
      ]
    );

    transformedData.sort((a: { 일자: number }, b: { 일자: number }) => {
      if (a.일자 < b.일자) return -1;
      if (a.일자 > b.일자) return 1;
      return 0;
    });

    return transformedData;
  };

  const handleTimeChartChange = (
    date: Dayjs,
    dateString: string | string[]
  ) => {
    setSelectedTime(date);
  };

  const onRangePickerChartChange = (
    dates: [Dayjs | null, Dayjs | null],
    dateStrings: [string, string]
  ) => {
    if (dates) {
      const startDate = dates[0];
      const endDate = dates[1];

      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);
      setButtonDisabled(false);
    } else {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setButtonDisabled(true);
    }
  };

  const onOk = (value: RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  const disabledRangePickerChartDate = (current: any) => {
    const currentDate = moment();
    const thirtyDaysAgo = currentDate.clone().subtract(120, 'days');

    return current < thirtyDaysAgo || current > currentDate;
  };

  const handleBbiTripSelect = (value: string) => {
    console.log(`selected ${value}`);
    setBbiTripValue(value);
  };

  const makeQueryChartString = () => {
    const queryParams: Record<string, string | null> = {
      hour: selectedTime === null ? null : selectedTime.format('HH'),
      start_date:
        selectedStartDate === null
          ? null
          : selectedStartDate.format('YYYYMMDD'),
      end_date:
        selectedEndDate === null ? null : selectedEndDate.format('YYYYMMDD'),
      id: bbiTripValue,
    };
    return encodeQueryData(queryParams);
  };

  const handleClickFetchChartData = () => {
    console.log(makeQueryChartString());
    bbiDetectionFetch(makeQueryChartString());
  };

  // const config = {
  //   violinType: 'normal',
  //   data: bbiDetectionData,
  //   xField: '일자',
  //   yField: 'count',
  //   seriesField: 'behavior',
  //   slider: { y: true },
  //   point: {
  //     size: 0.1,
  //     shape: 'circle',
  //     style: {
  //       fill: 'red',
  //       stroke: 'black',
  //       lineWidth: 0.1,
  //     },
  //   },
  // };
  const transformDataToPlotly = (data: any[]) => {
    const behaviors = ['급가속', '급감속', '급정지', '급출발'];
    const colors = ['blue', 'red', 'green', 'orange'];

    const plotlyData = behaviors.map((behavior, index) => {
      const behaviorData = data.filter((item) => item.behavior === behavior);

      return {
        type: 'violin',
        x: behaviorData.map((item) => item.일자.toString()),
        y: behaviorData.map((item) => item.count),
        legendgroup: behavior,
        scalegroup: behavior,
        name: behavior,
        points: 'all',
        box: {
          visible: true,
        },
        line: {
          color: colors[index],
        },
        meanline: {
          visible: true,
        },
      };
    });

    return plotlyData;
  };
  // const behaviors = ['급가속', '급감속', '급정지', '급출발'];
  // const colors = ['blue', 'red', 'green', 'orange'];
  //
  // const traces = behaviors.map((behavior, index) => {
  //   const filteredData = bbiDetectionData.filter(
  //     (item) => item.behavior === behavior
  //   );
  //
  //   return {
  //     x: filteredData.map((item) => item.일자),
  //     y: filteredData.map((item) => item.count),
  //     mode: 'markers',
  //     legendgroup: behavior,
  //     scalegroup: behavior,
  //     name: behavior,
  //     marker: {
  //       size: filteredData.map((item) => item.count),
  //       sizemode: 'area',
  //       sizeref:
  //         (2.0 * Math.max(...bbiDetectionData.map((item) => item.count))) /
  //         40 ** 2,
  //       color: colors[index],
  //     },
  //     name: behavior,
  //   };
  // });
  //
  // const layout = {
  //   title: 'Bbi Detection Bubble Chart',
  //   yaxis: { title: 'Count' },
  //   xaxis: { title: '일자', type: 'category' },
  //   showlegend: true,
  //   height: 600,
  //   width: 600,
  // };

  return (
    <div>
      <h3>Bbi Detection</h3>
      <Button
        className={'h3-margin'}
        type={'primary'}
        style={{
          float: 'right',
        }}
        onClick={handleClickFetchChartData}
        disabled={buttonDisabled}
      >
        조회
      </Button>
      <Row gutter={16}>
        <Col span={6} style={{ paddingRight: '8px' }}>
          <TimePicker
            className={'h3-margin'}
            value={selectedTime}
            onChange={handleTimeChartChange}
            format="HH"
            showMinute={false}
            showSecond={false}
            hourStep={1}
            needConfirm={false}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={12} style={{ paddingLeft: '0px', paddingRight: '8px' }}>
          <RangePicker
            className={'h3-margin'}
            value={[selectedStartDate, selectedEndDate]}
            style={{ width: '100%' }}
            format="YYYYMMDD"
            onChange={onRangePickerChartChange}
            disabledDate={disabledRangePickerChartDate}
            onOk={onOk}
          />
        </Col>
        <Col span={6} style={{ paddingLeft: '8px' }}>
          <Select
            className={'h3-margin'}
            showSearch
            placeholder="Trip 선택"
            optionFilterProp="children"
            style={{ width: '100%' }}
            onChange={handleBbiTripSelect}
            defaultValue={'trip'}
            options={bbiUnitFilter}
          >
            {bbiUnitFilter.map((data, index) => (
              <Select.Option value={data.value} key={index}>
                {data.value}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Spin
        spinning={bbiDetectionLoading}
        indicator={<LoadingOutlined />}
        tip="로딩 중..."
      >
        <div style={{ width: '100%', height: '100%' }}>
          <Plot
            data={bbiDetectionData}
            layout={{
              title: 'Bbi Detection Violin Plot',
              yaxis: { title: 'Count' },
              xaxis: { title: '일자', type: 'category' },
              violinmode: 'group',
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </Spin>
    </div>
  );
};
export default MonitoringBbiChart;

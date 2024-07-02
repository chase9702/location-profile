import React, {useEffect, useState} from "react";
import {Column, Violin} from "@ant-design/plots";
import {get} from "@src/api";
import {Button, Col, Row} from "antd";
import TimePicker from "antd/lib/time-picker";
import Select from "antd/lib/select";
import {bbiMetricFilter,bbiThresholdFilter, bbiUnitFilter} from "@src/components/plugControl/types";
import {encodeQueryData} from "@src/common/utils";
import moment from "moment";
import {RangePickerProps} from "antd/es/date-picker";
import DatePicker from "antd/lib/date-picker";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import Spin from "antd/lib/spin";

interface Props {

}

const MonitoringDeviceChart = (props:Props): React.ReactElement => {
    const {RangePicker} = DatePicker;
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [bbiAbnormalLoading, setBbiAbnormalLoading] = useState(false);
    const [bbiAbnormalData, setBbiAbnormalData] = useState(null);
    // const [selectedRangeValue, setSelectedRangeValue] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState(null);
    const [selectedMetric, setSelectedMetric] = useState('total');
    const [selectedThreshold, setSelectedThreshold] = useState('total');
    const [selectedUnit, setSelectedUnit] = useState('trip');

    useEffect(() => {
        const currentDate = moment().utcOffset('+09:00');
        const startDate = currentDate.clone().subtract(7, 'days').format('YYYYMMDD');
        const endDate = currentDate.clone().subtract(1, 'days').format('YYYYMMDD');

        console.log(startDate)
        console.log(endDate)

        setSelectedStartTime(startDate);
        setSelectedEndTime(endDate);
    }, []);

    useEffect(() => {
        setBbiAbnormalLoading(true);
        get<[]>(`/api/monitoring/bbi/abnormal/?start_date=20240604&end_date=20240608&metric=total&threshold=total&trip=total`)
            .then((jsonData) => {
                console.log(jsonData)
                const transformedData = groupByAndSum(jsonData);
                console.log(transformedData);
                setBbiAbnormalData(transformedData);
            })
            .finally(() => {
                setBbiAbnormalLoading(false);
                setButtonDisabled(true);
            });
    }, []);

    const bbiAbnormalFetch = (queryString: string) => {
        setBbiAbnormalLoading(true);
        get<[]>(`/api/monitoring/bbi/abnormal/?${queryString}`)
            .then((jsonData) => {
                const transformedData = groupByAndSum(jsonData);
                console.log(transformedData);
                setBbiAbnormalData(transformedData);
            })
            .finally(() => {
                setBbiAbnormalLoading(false);
            });
    };

    const groupByAndSum = (data: { metric: string; part_dt: string; threshold: string; unit: string; value: number; }[]) => {
        const grouped: { [key: string]: { part_dt: string; metric: string; sum: number; } } = {};

        const metricMapping: { [key: string]: string } = {
            'loss': '유실율',
            'abn_loc': '이상 위치',
            'abn_sp': '이상 속도(필터 전)',
            'abn_fs': '이상 속도(필터 후)',
            'fseg':'dt>2이상'
        };

        data.forEach(item => {
            // metric 값을 변환
            const metric = metricMapping[item.metric] || item.metric;
            const key = `${item.part_dt}-${metric}`;

            if (!grouped[key]) {
                grouped[key] = {
                    part_dt: item.part_dt,
                    metric: metric,
                    sum: 0,
                };
            }

            grouped[key].sum += item.value;
        });

        // 소수점 두 자리 반올림
        Object.keys(grouped).forEach(key => {
            grouped[key].sum = Math.round(grouped[key].sum * 100) / 100;
        });

        return Object.values(grouped);
    };

    const handleMetricSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        console.log(`selected ${value}`);
        setSelectedMetric(value);
    };

    const handleThresholdSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        console.log(`selected ${value}`);
        setSelectedThreshold(value)
    };

    const handleUnitSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        console.log(`selected ${value}`);
        setSelectedUnit(value)
    };

    const onRangePickerChartChange = (value: RangePickerProps['value'], dateString: [string, string] | string,) => {
        const startDate = dateString[0];
        const endDate = dateString[1];

        console.log(startDate)
        setSelectedStartTime(startDate);
        setSelectedEndTime(endDate);
        setButtonDisabled(false);
    };

    const disabledRangePickerChartDate = (current: any) => {
        const currentDate = moment();
        const thirtyDaysAgo = currentDate.clone().subtract(120, 'days');

        return current < thirtyDaysAgo || current > currentDate;
    };

    const onOk = (value: RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const handleClickFetchAbnormalData = () => {
        console.log(makeQueryChartString());
        bbiAbnormalFetch(makeQueryChartString());
    };

    const makeQueryChartString = () => {
        const queryParams: Record<string, string | null> = {
            start_date: selectedStartTime,
            end_date: selectedEndTime,
            metric: selectedMetric,
            threshold: selectedThreshold,
            unit: selectedUnit,
        };
        return encodeQueryData(queryParams)
    }

    const bbiAbnormalConfig = {
        data: bbiAbnormalData,
        xField: 'part_dt',
        yField: 'sum',
        colorField: 'metric',
        group: true,
        style: {
            inset: 5,
        },
        label: {
            text: 'sum',
            textBaseline: 'top',
        },
    };

    return (
        <div>
            <h3>이상 Device</h3>
            <Button
                className={"h3-margin"}
                type={'primary'}
                style={{
                    float: "right",
                }}
                onClick={handleClickFetchAbnormalData}
                disabled={buttonDisabled}
            >
                조회
            </Button>
            <Row gutter={16}>
                <Col span={10}>
                    <RangePicker
                        className={"h3-margin"}
                        style={{ width: '100%' }}
                        format="YYYYMMDD"
                        onChange={onRangePickerChartChange}
                        disabledDate={disabledRangePickerChartDate}
                        onOk={(value) => console.log(value)}
                        defaultValue={[selectedStartTime, selectedEndTime]}
                    />
                </Col>
                <Col span={4}>
                    <Select
                        className={"h3-margin"}
                        showSearch
                        placeholder="Metric 전체"
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        onChange={handleMetricSelectChange}
                        defaultValue={'Metric 전체'}
                        options={bbiMetricFilter}
                    >
                        {bbiMetricFilter.map((data, index) => (
                            <Select.Option value={data.value} key={index}>
                                {data.value}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={4}>
                    <Select
                        className={"h3-margin"}
                        showSearch
                        placeholder="Threshold 선택"
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        onChange={handleThresholdSelectChange}
                        defaultValue={'Threshold 전체'}
                        options={bbiThresholdFilter}
                    >
                        {bbiThresholdFilter.map((data, index) => (
                            <Select.Option value={data.value} key={index}>
                                {data.value}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={4}>
                    <Select
                        className={"h3-margin"}
                        showSearch
                        placeholder="Unit 선택"
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        onChange={handleUnitSelectChange}
                        defaultValue={'total'}
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
            <Spin spinning={bbiAbnormalLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                <Column {...bbiAbnormalConfig} />
            </Spin>
        </div>
    )
};

export default MonitoringDeviceChart;
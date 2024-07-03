import React, {useEffect, useState} from "react";
import {Violin} from '@ant-design/plots';
import {Button, Col, Row} from "antd";
import TimePicker from "antd/lib/time-picker";
import Select from "antd/lib/select";
import {aiStatusFilter, aiUnitFilter} from "@src/components/plugControl/types";
import DatePicker from "antd/lib/date-picker";
import moment from "moment/moment";
import {RangePickerProps} from "antd/es/date-picker";
import {get} from "@src/api";
import {Simulate} from "react-dom/test-utils";
import Spin from "antd/lib/spin";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import {encodeQueryData} from "@src/common/utils";
import dayjs, {Dayjs} from "dayjs";
import {now} from "moment";


interface Props {
}

const MonitoringAiChart = (props: Props): React.ReactElement => {
    const {RangePicker} = DatePicker;
    const hourOptions = Array.from({length: 24}, (_, i) => ({value: i + 1, label: `${i + 1}`}));
    const [selectedTime, setSelectedTime] = useState(dayjs(now()));
    const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(dayjs().subtract(7, 'day'));
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs().subtract(1, 'day'));
    const [selectedId, setSelectedId] = useState("trip_id");
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [aiDetectionLoading, setAiDetectionLoading] = useState(false);
    const [aiDetectionData, setAiDetectionData] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        setAiDetectionLoading(true);
        get<[]>(`/api/monitoring/ai/detection/?start_date=20240619&end_date=20240625`)
            .then((jsonData) => {
                console.log(jsonData)
                const transformedData = transformData(jsonData);
                setAiDetectionData(transformedData)
            })
            .catch((error) => {
                console.error('Error fetching AI detection data:', error);
            })
            .finally(() => {
                setAiDetectionLoading(false);
                setButtonDisabled(false);
            });
    }, []);

    const aiDetectionFetch = (queryString: string) => {
        setAiDetectionLoading(true);
        get<[]>(`/api/monitoring/ai/detection/?${queryString}`)
            .then((jsonData) => {
                console.log('Fetched data:', jsonData);
                const transformedData = transformData(jsonData);
                console.log('Transformed data:', transformedData);
                setAiDetectionData(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching AI detection data:', error);
            })
            .finally(() => {
                setAiDetectionLoading(false);
            });
    };

    const transformData = (data: any) => {
        if (!data) {
            return [];
        }

        const manualData = [
            {part_dt: '20240430', level: 'level 2', count: 0.00}
        ];

        const transformedData = data.flatMap((item: { part_dt: any; lv_1_cnt: any; lv_2_cnt: any; }) => [
            {part_dt: item.part_dt, level: 'level 1', count: item.lv_1_cnt},
            {part_dt: item.part_dt, level: 'level 2', count: item.lv_2_cnt},
        ]);

        transformedData.push(...manualData);

        transformedData.sort((a: { part_dt: number; }, b: { part_dt: number; }) => {
            if (a.part_dt < b.part_dt) return -1;
            if (a.part_dt > b.part_dt) return 1;
            return 0;
        });

        return transformedData;
    };

    const handleTimeChartChange = (date: Dayjs, dateString: string | string[]) => {
        setSelectedTime(date);
    };

    const onRangePickerAiChange = (dates: [Dayjs | null, Dayjs | null], dateStrings: [string, string]) => {
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
    //
    // const onRangePickerAiChange = (dateString: (string | number | dayjs.Dayjs | Date)[]) => {
    //     const startDate = dayjs(dateString[0]);
    //     const endDate = dayjs(dateString[1]);
    //
    //     console.log(startDate)
    //     console.log(endDate)
    //
    //     setSelectedStartDate(startDate);
    //     setSelectedEndDate(endDate);
    //     setButtonDisabled(false);
    // };

    const onOk = (value: RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const disabledRangePickerChartDate = (current: any) => {
        const currentDate = moment();
        const thirtyDaysAgo = currentDate.clone().subtract(120, 'days');

        return current < thirtyDaysAgo || current > currentDate;
    };

    const handleTripSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        console.log(`selected ${value}`);
        // setClickGetData(false);
        // dispatch(setSelectDeviceGb(value))
        setSelectedId(value);
    };

    const handleStatusSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        console.log(`selected ${value}`);
        // setClickGetData(false);
        // dispatch(setSelectDeviceGb(value))
        setSelectedStatus(value);
    };

    const handleClickFetchChartData = () => {
        console.log(makeQueryChartString());
        aiDetectionFetch(makeQueryChartString());
    };

    const makeQueryChartString = () => {
        const queryParams: Record<string, string | null> = {
            hour: selectedTime === null ? null : selectedTime.format("HH"),
            start_date:selectedStartDate === null ? null : selectedStartDate.format('YYYYMMDD'),
            end_date:selectedEndDate === null ? null : selectedEndDate.format('YYYYMMDD'),
            id: selectedId,
            status: selectedStatus,
        };
        return encodeQueryData(queryParams)
    }

    const aiDetectionConfig = {
        violinType: 'normal',
        data: aiDetectionData,
        xField: 'part_dt',
        yField: 'count',
        seriesField: 'level',
    };

    return (
        <div>
            <h3>AI 사고 인지</h3>
            <Button
                className={"h3-margin"}
                type={'primary'}
                style={{
                    float: "right",
                }}
                onClick={handleClickFetchChartData}
                disabled={buttonDisabled}
            >
                조회
            </Button>
            <Row gutter={16}>
                <Col span={5}>
                    <TimePicker
                        className={"h3-margin"}
                        value={selectedTime}
                        onChange={handleTimeChartChange}
                        format="HH"
                        showMinute={false}
                        showSecond={false}
                        hourStep={1}
                        needConfirm={false}
                    />
                </Col>
                <Col span={10}>
                    <RangePicker
                        className={"h3-margin"}
                        value={[selectedStartDate, selectedEndDate]}
                        style={{width: '100%'}}
                        format="YYYYMMDD"
                        onChange={onRangePickerAiChange}
                        disabledDate={disabledRangePickerChartDate}
                        onOk={onOk}
                    />
                </Col>
                <Col span={5}>
                    <Select
                        className={"h3-margin"}
                        showSearch
                        placeholder="Trip 선택"
                        optionFilterProp="children"
                        style={{width: '100%'}}
                        onChange={handleTripSelectChange}
                        defaultValue={'trip'}
                        options={aiUnitFilter}
                    >
                        {aiUnitFilter.map((data, index) => (
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
                        placeholder="처리 상태 선택"
                        optionFilterProp="children"
                        style={{width: '100%'}}
                        onChange={handleStatusSelectChange}
                        defaultValue={'전체'}
                        options={aiStatusFilter}
                    >
                        {aiStatusFilter.map((data, index) => (
                            <Select.Option value={data.value} key={index}>
                                {data.value}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Spin spinning={aiDetectionLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                {!aiDetectionLoading && aiDetectionData.length > 0 && (
                    <Violin {...aiDetectionConfig} />
                )}
            </Spin>
        </div>
    )
};

export default MonitoringAiChart

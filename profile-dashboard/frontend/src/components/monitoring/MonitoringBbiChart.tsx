import React, {useEffect, useState, useMemo} from "react";
import {Violin} from "@ant-design/plots";
import TimePicker from "antd/lib/time-picker";
import DatePicker from "antd/lib/date-picker";
import {RangePickerProps} from "antd/es/date-picker";
import moment from "moment";
import {Button, Col, Row} from "antd";
import Select from "antd/lib/select";
import {bbiBehaviorFilter, bbiUnitFilter} from "@src/components/plugControl/types";
import {setSelectDeviceGb} from "@src/actions/DeviceAction";
import {get} from "@src/api";
import {encodeQueryData} from "@src/common/utils";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import Spin from "antd/lib/spin";

interface Props {

}

const MonitoringBbiChart = (props: Props): React.ReactElement => {
    const {RangePicker} = DatePicker;
    const hourOptions = Array.from({length: 24}, (_, i) => ({value: i + 1, label: `${i + 1}`}));
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedRangeValue, setSelectedRangeValue] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [bbiDetectionLoading, setBbiDetectionLoading] = useState(false);
    const [bbiDetectionData, setBbiDetectionData] = useState<any[]>([]);
    const [formattedStartTime, setFormattedStartTime] = useState(null);
    const [formattedEndTime, setFormattedEndTime] = useState(null);
    const [bbiTripValue, setBbiTripValue] = useState('trip_id');
    const [bbiBehaviorValue, setBbiBehaviorValue] = useState(null);

    useEffect(() => {
        setBbiDetectionLoading(true);
        get<[]>(`/api/monitoring/bbi/detection/?start_date=20240601&end_date=20240607`)
            .then((jsonData) => {
                const transformedData = transformData(jsonData)
                console.log(transformedData)
                setBbiDetectionData(transformedData);
            })
            .finally(() => {
                setBbiDetectionLoading(false);
                setButtonDisabled(true);
            });
    }, []);

    const bbiDetectionFetch = (queryString: string) => {
        setBbiDetectionLoading(true);
        get<[]>(`/api/monitoring/bbi/detection/?${queryString}`)
            .then((jsonData) => {
                console.log(jsonData);
                const transformedData = transformData(jsonData);
                console.log(transformedData);
                setBbiDetectionData(transformedData);
            })
            .finally(() => {
                setBbiDetectionLoading(false);
            });
    };

    const transformData = (data) => {
        if (!data) {
            return [];
        }

        const transformedData = data.flatMap((item) => [
            { part_dt: item.part_dt, behavior: '급가속', count: item.sac },
            { part_dt: item.part_dt, behavior: '급감속', count: item.sdc },
            { part_dt: item.part_dt, behavior: '급정지', count: item.ssp },
            { part_dt: item.part_dt, behavior: '급출발', count: item.sst },
        ]);

        transformedData.sort((a: { part_dt: number; }, b: { part_dt: number; }) => {
            if (a.part_dt < b.part_dt) return -1;
            if (a.part_dt > b.part_dt) return 1;
            return 0;
        });

        return transformedData;
    };

    const handleTimeChartChange = (time: moment.Moment | null, timeString: string) => {
        setSelectedTime(time);
        setSelectedHour(timeString);
    };

    const onRangePickerChartChange = (value: RangePickerProps['value'], dateString: [string, string] | string,) => {
        const startDate = dateString[0];
        const endDate = dateString[1];

        setFormattedStartTime(startDate);
        setFormattedEndTime(endDate);
        setButtonDisabled(false);
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
            hour: selectedHour,
            start_date: formattedStartTime,
            end_date: formattedEndTime,
            id: bbiTripValue,
        };
        return encodeQueryData(queryParams);
    };

    const handleClickFetchChartData = () => {
        console.log(makeQueryChartString());
        bbiDetectionFetch(makeQueryChartString());
    };

    const config = ({
        violinType: 'normal',
        data: bbiDetectionData,
        xField: 'part_dt',
        yField: 'count',
        seriesField: 'behavior',
        meta: {
            part_dt: {
                alias: '일자',
            },
        },
    });

    return (
        <div>
            <h3>Bbi Detection</h3>
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
                <Col span={6}>
                    <TimePicker
                        className={"h3-margin"}
                        value={selectedTime}
                        onChange={handleTimeChartChange}
                        format="HH"
                        showHour={true}
                        showMinute={false}
                        showSecond={false}
                        hourStep={1}
                        options={hourOptions}
                        style={{width: '100%'}}
                    />
                </Col>
                <Col span={12}>
                    <RangePicker
                        className={"h3-margin"}
                        defaultValue={selectedRangeValue}
                        style={{width: '100%'}}
                        format="YYYYMMDD"
                        onChange={onRangePickerChartChange}
                        disabledDate={disabledRangePickerChartDate}
                        onOk={onOk}
                    />
                </Col>
                <Col span={6}>
                    <Select
                        className={"h3-margin"}
                        showSearch
                        placeholder="Trip 선택"
                        optionFilterProp="children"
                        style={{width: '100%'}}
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
            <Spin spinning={bbiDetectionLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                {!bbiDetectionLoading && bbiDetectionData.length > 0 && (
                    <Violin {...config} />
                )}
            </Spin>
        </div>
    )
};
export default MonitoringBbiChart
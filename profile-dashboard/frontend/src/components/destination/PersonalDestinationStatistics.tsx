import React, {useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import {personalFilter} from "@src/components/plugControl/types";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import DatePicker from "antd/lib/date-picker";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import Table from "antd/lib/table";
import {addDataToMap, updateMap, toggleSidePanel} from "kepler.gl/actions";
import {store} from "@src/index";
import {Input, Radio, Space} from "antd";
import {get} from "@src/api";
import {RangePickerProps} from "antd/es/date-picker";
import {NotifyError} from "@src/components/common/Notification";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import Spin from "antd/lib/spin";


interface Props {

}

const PersonalDestinationStatistics = (props: Props): React.ReactElement => {

    const [personalDestinationData, setPersonalDestinationData] = useState([])
    const [fetchData, setFetchData] = useState(false);
    const [personalValueData, setPersonalValueData] = useState("");
    const [personalSelectData, setPersonalSelectData] = useState("");
    const [parameterUrl, setParameterUrl] = useState("")
    const [selectedDateValue, setSelectedDateValue] = useState(null);
    const [selectedRangeValue, setSelectedRangeValue] = useState(null);
    const [formattedMonth, setFormattedMonth] = useState(null);
    const [formattedStartTime, setFormattedStartTime] = useState(null);
    const [formattedEndTime, setFormattedEndTime] = useState(null);
    const [personalTableLoading, setpersonalTableLoading] = useState(false);
    const {RangePicker} = DatePicker;
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [radioValue, setValue] = useState(1);


    useEffect(() => {

        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }))

        /*
        그냥 초기 데이터 보여주는건데.. 이게 또 없으면 그 add file이 팝업 되서..
        이 부분은 팝업 안되고 내가 만든 조회 화면이 띄워지게 한다거나
        아니면 그냥 디폴트 조회로 오늘날짜 기준 무언가를 보여준다거나 해야 할듯?
         */
    }, []);

    // useEffect(() => {
    //
    //     const h3Data = [
    //         { h3Index: '8a30e1d93037fff', value: 10 },
    //         { h3Index: '8a30e1d92acffff', value: 10000 },
    //     ];
    //
    //     store.dispatch(
    //         updateMap({
    //             datasets: [
    //                 {
    //                     data: {
    //                         fields: [
    //                             { name: 'h3Index', format: '' },
    //                             { name: 'value', format: '' },
    //                         ],
    //                         rows: h3Data,
    //                     },
    //                     info: { label: 'H3 Data', id: 'h3_data' },
    //                     keplerGl: { type: 'point', config: { dataId: 'h3_data' } },
    //                 },
    //             ],
    //             config: {},
    //             options: { readOnly: true },
    //         })
    //     );
    // }, [store.dispatch]);

    useEffect(() => {
        if (fetchData) {
            personalDestinationFetch();
            setFetchData(false);
        }
    }, [fetchData, personalValueData]);

    const personalDestinationFetch = () => {
        get<[]>(`/api/location/destination/personal/?${parameterUrl}`)
            .then((jsonData) => {
                console.log(jsonData)
                setPersonalDestinationData(jsonData)
            })
            .catch((error) => {
                NotifyError(error)
            })
        .finally(() => {
            setpersonalTableLoading(false);
        });
    };

    const handleSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        setPersonalSelectData(value);
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPersonalValueData(value);
    };

    const handleClickData = () => {
        const queryParams: Record<string, string | null> = {
            member_id: null,
            plyno: null,
            dvc_id: null,
            month: formattedMonth,
            startDate: formattedStartTime,
            endDate: formattedEndTime
        };

        if (personalSelectData === 'member_id') {
            queryParams.member_id = personalValueData;
            console.log(queryParams);
        } else if (personalSelectData === 'plyno') {
            queryParams.plyno = personalValueData;
        } else if (personalSelectData === 'dvc_id') {
            queryParams.dvc_id = personalValueData;
        }

        // API 쿼리 파리미터 생성
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        setParameterUrl(queryString);
        setpersonalTableLoading(true);
        setFetchData(true);
    };

    const onDatePickerChange = (value: RangePickerProps['value'], dateString: string,) => {
        setFormattedMonth(dateString.replace(/-/g, ''))
        setButtonDisabled(false);
        setFormattedStartTime(null);
        setFormattedEndTime(null);
    };

    const onRangePickerChange = (value: RangePickerProps['value'], dateString: [string, string] | string,) => {
        const startDate = dateString[0];
        const endDate = dateString[1];

        setFormattedStartTime(startDate);
        setFormattedEndTime(endDate);
        setButtonDisabled(false);
        setFormattedMonth(null);
    };

    const onOk = (value: RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const onRadioChange = (e) => {
        setButtonDisabled(true);
        setValue(e.target.value);
    };

    const personalDestinationColumns = [
        {
            title: '주소지',
            dataIndex: 'end_h3',
            width: 200,
            align: 'center' as const,
        },
        {
            title: '카운트',
            dataIndex: 'count',
            width: 220,
            align: 'center' as const,
        },
        {
            title: '랭크',
            dataIndex: 'rank',
            align: 'center' as const,
        },
        {
            title: 'H3좌표',
            dataIndex: 'end_h3',
            width: 220,
            align: 'center' as const,
        },
    ];

    return (
        <div>
            <Card>
                <Row>
                    <Col span={2}>
                        <h3>개인 필터 : </h3>
                    </Col>
                    <Col span={4}>
                        <Select
                            className={"h3-margin"}
                            showSearch
                            placeholder="필터링 조건"
                            optionFilterProp="children"
                            style={{
                                width: '80%', float: 'left',
                            }}
                            onChange={handleSelectChange}
                            options={personalFilter}
                        >
                            {personalFilter.map((data, index) => {
                                return (
                                    <Select.Option value={data.value} key={index}>
                                        {data.value}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Input placeholder="* 필수 입력"
                               className={"h3-margin"}
                               onChange={handleValueChange}
                               style={{
                                   width: '80%', float: 'left', color: 'red'
                               }}
                        />
                    </Col>
                    <Col span={2}>
                        <h3>날짜 : </h3>
                    </Col>
                    <Col span={4}>
                        <Radio.Group onChange={onRadioChange} value={radioValue}>
                            <Space direction="vertical">
                                <Radio value={1}>월별 날짜 선택</Radio>
                                <Radio value={2}>기간 날짜 선택</Radio>
                            </Space>
                        </Radio.Group>
                    </Col>
                    <Col span={4}>
                        {radioValue === 1 && (
                            <DatePicker
                                className={"h3-margin"}
                                defaultValue={selectedDateValue}
                                onChange={onDatePickerChange}
                                picker="month"
                            />
                        )}
                        {radioValue === 2 && (
                            <Space direction="vertical" size={12}>
                                <RangePicker
                                    className={"h3-margin"}
                                    defaultValue={selectedRangeValue}
                                    style={{
                                        width: '130%',
                                    }}
                                    onChange={onRangePickerChange}
                                    format="YYYYMMDD"
                                    onOk={onOk}
                                />
                            </Space>
                        )}
                    </Col>
                    <Col span={4}>
                        <Button
                            className={"h3-margin"}
                            type={'primary'}
                            style={{
                                float: "right",
                            }}
                            onClick={handleClickData}
                            disabled={buttonDisabled}
                        >
                            조회
                        </Button>
                    </Col>
                </Row>
            </Card>
            <CustomKeplerMap
                heightRatio={70}
                id={"personalMap"}
            />
            <Card>
                <Spin spinning={personalTableLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                    <Table columns={personalDestinationColumns}
                           dataSource={personalDestinationData}
                           scroll={{y: 600}}
                           onRow={(record, rowIndex) => {
                               return {
                                   onClick: (event) => {
                                       console.log(record)
                                   }, // click row
                               };
                           }}
                    />
                </Spin>

            </Card>
        </div>
)
};

export default PersonalDestinationStatistics;

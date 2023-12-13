import React, {ChangeEvent, useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import {useDispatch} from "react-redux";
import {personalFilter} from "@src/components/plugControl/types";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import DatePicker from "antd/lib/date-picker";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import Table from "antd/lib/table";
import {addDataToMap, updateMap, toggleSidePanel} from "kepler.gl/actions";
import {store} from "@src/index";
import {Input, Space} from "antd";
import {get} from "@src/api";
import moment from 'moment';
import {RangePickerProps} from "antd/es/date-picker";
import {NotifyError} from "@src/components/common/Notification";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import Spin from "antd/lib/spin";


interface Props {

}

const PersonalDestinationStatistics = (props: Props): React.ReactElement => {

    const dateFormat = 'YYYYMMDD';
    const dispatch = useDispatch();
    const [deviceLoading, setDeviceLoading] = useState(false);
    const [tripLoading, setTripLoading] = useState(false);
    const [deviceGbValue, setDeviceGbValue] = useState("TOTAL");
    const [clickGetData, setClickGetData] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState([]);
    const [personalDestinationData, setPersonalDestinationData] = useState([])
    const [fetchData, setFetchData] = useState(false);
    const [personalValueData, setPersonalValueData] = useState("");
    const [personalSelectData, setPersonalSelectData] = useState("");
    const [parameterUrl, setParameterUrl] = useState("")
    const [selectedDateValue, setSelectedDateValue] = useState(null);
    const [selectedRangeValue, setSelectedRangeValue] = useState(null);

    const [rangePickerDisabled, setRangePickerDisabled] = useState(false);
    const [datePickerDisabled, setDatePickerDisabled] = useState(false);

    const [formattedStartTime, setFormattedStartTime] = useState(null);
    const [formattedEndTime, setFormattedEndTime] = useState(null);

    const [personalTableLoading, setpersonalTableLoading] = useState(true);
    const {RangePicker} = DatePicker;

    useEffect(() => {

        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }))

        /*
        그냥 초기 데이터 보여주는건데.. 이게 또 없으면 그 add file이 팝업 되서..
        이 부분은 팝업 안되고 내가 만든 조회 화면이 띄워지게 한다거나
        아니면 그냥 디폴트 조회로 오늘날짜 기준 무언가를 보여준다거나 해야 할듯?
         */
        // store.dispatch(toggleSidePanel("personalMap"));
    }, []);

    const personalDestinationFetch = () => {
        get<[]>(`/api/location/destination/?${parameterUrl}`)
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

    useEffect(() => {
        if (fetchData) {
            personalDestinationFetch();
            setFetchData(false);
        }
    }, [fetchData, personalValueData]);

    const handleSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        setPersonalSelectData(value);
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPersonalValueData(value);
        console.log(personalValueData);
    };

    const handleClickData = () => {
        const queryParams: Record<string, string | null> = {
            member_id: null,
            plyno: null,
            dvc_id: null,
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
        setFetchData(true);
    };

    const onDatePickerChange = (value) => {
        if (value == null) {
            setDatePickerDisabled(false);
            setRangePickerDisabled(false);
        } else {
            setSelectedDateValue(value);
            setRangePickerDisabled(true);
        }
    };

    const onRangePickerChange = (
        value: RangePickerProps['value'],
        dateString: [string, string] | string,) => {
        if (!value) {
            setDatePickerDisabled(false);
            setRangePickerDisabled(false);
        } else {
            const startDate = dateString[0]
            const endDate = dateString[1]

            setFormattedStartTime(startDate);
            setFormattedEndTime(endDate);

            setSelectedRangeValue(value);
            setDatePickerDisabled(true);
        }
    };

    const onOk = (value: RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const personalDestinationColumns = [
        {
            title: '주소지',
            dataIndex: 'endH3',
            width: 200,
            align: 'center' as const,
        },
        {
            title: '카운트',
            dataIndex: 'endH3',
            width: 220,
            align: 'center' as const,
        },
        {
            title: '랭크',
            dataIndex: 'endH3',
            align: 'center' as const,
        },
        {
            title: 'H3좌표',
            dataIndex: 'endH3',
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
                        <Input placeholder="필수 입력"
                               className={"h3-margin"}
                               onChange={handleValueChange}
                               style={{
                                   width: '80%', float: 'left',
                               }}
                        />
                    </Col>
                    <Col span={2}>
                        <h3>날짜 : </h3>
                    </Col>
                    <Col span={4}>
                        <DatePicker
                            className={"h3-margin"}
                            defaultValue={selectedDateValue}
                            onChange={onDatePickerChange}
                            disabled={datePickerDisabled}
                            picker="month"
                        />
                    </Col>
                    <Col span={4}>
                        <Space direction="vertical" size={12}>
                            <RangePicker
                                className={"h3-margin"}
                                defaultValue={selectedRangeValue}
                                style={{
                                    width: '130%',
                                }}
                                onChange={onRangePickerChange}
                                disabled={rangePickerDisabled}
                                format="YYYYMMDD"
                                onOk={onOk}
                            />
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Button
                            className={"h3-margin"}
                            type={'primary'}
                            style={{
                                float: "right",
                            }}
                            onClick={handleClickData}
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

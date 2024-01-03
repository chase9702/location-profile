import React, {useCallback, useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import {personalFilter} from "@src/components/plugControl/types";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import DatePicker from "antd/lib/date-picker";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import Table from "antd/lib/table";
import {addDataToMap, updateMap, toggleSidePanel, removeDataset, wrapTo} from "kepler.gl/actions";
import {store} from "@src/index";
import {Input, Radio, Space} from "antd";
import {get} from "@src/api";
import {RangePickerProps} from "antd/es/date-picker";
import {NotifyError} from "@src/components/common/Notification";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import Spin from "antd/lib/spin";
import moment from "moment";
import {processCsvData} from "kepler.gl/processors";
import {encodeQueryData} from "@src/common/utils";


interface Props {

}

interface Data {
    h3cell: string;
    rank: number;
    count: number;
    address: string;
}

const PersonalDestinationStatistics = (props: Props): React.ReactElement => {

    const [personalDestinationData, setPersonalDestinationData] = useState([])
    const [personalValueData, setPersonalValueData] = useState("");
    const [personalSelectData, setPersonalSelectData] = useState("");
    const [selectedDateValue, setSelectedDateValue] = useState(null);
    const [selectedRangeValue, setSelectedRangeValue] = useState(null);
    const [formattedMonth, setFormattedMonth] = useState(null);
    const [formattedStartTime, setFormattedStartTime] = useState(null);
    const [formattedEndTime, setFormattedEndTime] = useState(null);
    const [personalTableLoading, setpersonalTableLoading] = useState(false);
    const {RangePicker} = DatePicker;
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [radioValue, setValue] = useState(1);

    const wrapToMap = wrapTo('personalMap')

    useEffect(() => {

        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }))

    }, []);

    const addH3DataKepler = (formattedData: string) => {

        store.dispatch(removeDataset("h3_personal_data"));

        store.dispatch(
            wrapToMap(addDataToMap({
            datasets: {
                info: {
                    label: 'h3 Personal Data',
                    id: 'h3_personal_data',
                },
                data: processCsvData(formattedData),
            },
        })));
    }

    const personalDestinationFetch = (queryString: string) => {
        setpersonalTableLoading(true);
        get<[]>(`/api/location/destination/personal/?${queryString}`)
            .then((jsonData) => {
                console.log(jsonData);
                setPersonalDestinationData(jsonData);
                const h3FormattedData = "geometry,Address,Rank,Count\n" + h3FormatData(jsonData)
                addH3DataKepler(h3FormattedData);
            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
                setpersonalTableLoading(false);
            });
    };

    const h3FormatData = (data: Data[]): string => {
        return data.map((item) => {
            return `"${item.h3cell}",${item.address},${item.rank},${item.count}`;
        }).join('\n');
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

    const makeQueryString = () => {
        const queryParams: Record<string, string | null> = {
            member_id: null,
            plyno: null,
            dvc_id: null,
            month: formattedMonth,
            start_date: formattedStartTime,
            end_date: formattedEndTime
        };

        if (personalSelectData === 'member_id') {
            queryParams.member_id = personalValueData;
        } else if (personalSelectData === 'plyno') {
            queryParams.plyno = personalValueData;
        } else if (personalSelectData === 'dvc_id') {
            queryParams.dvc_id = personalValueData;
        }
        return encodeQueryData(queryParams)
    }

    const handleClickFetchData = () => {
        personalDestinationFetch(makeQueryString());
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

    const disabledRangePickerDate = (current: any) => {
        const currentDate = moment();
        const thirtyDaysAgo = currentDate.clone().subtract(120, 'days');
        return current < thirtyDaysAgo || current > currentDate;
    };

    const onOk = (value: RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const onRadioChange = (e) => {
        setButtonDisabled(true);
        setValue(e.target.value);
    };

    const extractFirstCoordinate = (polygonString:string) =>{
        const regex = /POLYGON\(\(\s*([^\s,]+)\s*([^\s,]+)\s*,/;
        const match = polygonString.match(regex);

        if (match && match.length === 3) {
            const longitude = parseFloat(match[1]);
            const latitude = parseFloat(match[2]);
            return { longitude, latitude, zoom: 14 };
        } else {
            return null; // 매치되는 값이 없을 경우
        }
    }

    const personalDestinationColumns = [
        {
            title: 'Address',
            dataIndex: 'address',
            width: 250,
            align: 'center' as const,
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            width: 100,
            align: 'center' as const,
        },
        {
            title: 'Count',
            dataIndex: 'count',
            width: 100,
            align: 'center' as const,
        },
        {
            title: 'H3',
            dataIndex: 'end_h3',
            width: 200,
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
                                   width: '80%', float: 'left'
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
                                    format="YYYYMMDD"
                                    onChange={onRangePickerChange}
                                    disabledDate={disabledRangePickerDate}
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
                            onClick={handleClickFetchData}
                            disabled={buttonDisabled}
                        >
                            조회
                        </Button>
                    </Col>
                </Row>
            </Card>
            <Row>
                <Col span={15}>
                    <CustomKeplerMap
                        heightRatio={70}
                        id={"personalMap"}
                    />
                </Col>
                <Col span={9}>
                    <Card>
                        <Spin spinning={personalTableLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                            <Table columns={personalDestinationColumns}
                                   dataSource={personalDestinationData}
                                   scroll={{y: 5000}}
                                   onRow={(record, rowIndex) => {
                                       return {
                                           onClick: (event) => {
                                               console.log(record.h3cell)
                                               console.log(extractFirstCoordinate(record.h3cell))
                                               store.dispatch(updateMap(extractFirstCoordinate(record.h3cell)))
                                               //POLYGON((126.93589717564313 37.494333725241106, 126.93582319423624 37.494953747055895, 126.93522323352242 37.49523218787344, 126.93469726604606 37.49489060783676, 126.93477125639322 37.49427059326881, 126.93537120527665 37.493992151490716))
                                           }, // click row
                                       };
                                   }}
                                   pagination={{pageSize: 20}}
                            />
                        </Spin>

                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default PersonalDestinationStatistics;

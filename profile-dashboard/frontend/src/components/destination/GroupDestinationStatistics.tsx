import React, {useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import {useDispatch, useSelector} from "react-redux";
import {NotifyError} from "@src/components/common/Notification";
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import {deviceModel} from "@src/components/plugControl/types";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import Tabs from "antd/lib/tabs";
import DeviceTop100Table from "@src/components/plugControl/device/DeviceTop100Table";
import {StoreState} from "@src/reducers";
import {get} from "@src/api";
import TabPane from "antd/es/tabs/TabPane";
import Spin from "antd/lib/spin";
import {setSelectDate, setSelectDeviceGb, setSelectDeviceId} from "@src/actions/DeviceAction";
import DeviceChart from "@src/components/plugControl/device/DeviceChart";
import DatePicker from "antd/lib/date-picker";
import dayjs, {Dayjs} from 'dayjs';
import {encodeQueryData} from "@src/common/utils";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import Table from "antd/lib/table";

interface Props {

}

const GroupDestinationStatistics = (props: Props): React.ReactElement => {

    const dateFormat = 'YYYYMMDD';
    const dispatch = useDispatch();
    const [selectedDateValue, setSelectedDateValue] = useState(dayjs().subtract(1, 'day'));

    useEffect(() => {
        dispatch(setSelectDate(selectedDateValue.format(dateFormat)))
    }, []);

    const handleSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        console.log(`selected ${value}`);
        setClickGetData(false);
        dispatch(setSelectDeviceGb(value))
        setDeviceGbValue(value);
    };

    const disabledDate = (current: Dayjs) => {
        return current.diff(dayjs(), 'days') == 0 || current.isAfter();
    };

    const onChangeSelectedDateValue = (date, dateString) => {
        dispatch(setSelectDate(dateString))
        setSelectedDateValue(date)
    };

    const columns = [
        {
            title: '증권번호',
            dataIndex: 'ply_no',
            width: 200,
            align: 'center' as const,
        },
        {
            title: '디바이스ID',
            dataIndex: 'dvc_id',
            width: 220,
            align: 'center' as const,
        },
        {
            title: '펌웨어버전',
            dataIndex: 'ver',
            align: 'center' as const,
        }
    ];

    return (
        <div>
            <Card>
                <Row>
                    <Col span={2}>
                        <h3>제조사 : </h3>
                    </Col>
                    <Col span={8}>
                        <Select
                            className={"h3-margin"}
                            showSearch
                            placeholder="제조사 선택"
                            optionFilterProp="children"
                            style={{
                                width: '80%', float: 'left',
                            }}
                            onChange={handleSelectChange}
                            options={deviceModel}
                        >
                            {deviceModel.map((data, index) => {
                                return (
                                    <Select.Option value={data.value} key={index}>
                                        {data.value}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Col>
                    <Col span={2}>
                        <h3>날짜 : </h3>
                    </Col>
                    <Col span={8}>
                        <DatePicker
                            className={"h3-margin"}
                            defaultValue={selectedDateValue}
                            disabledDate={disabledDate}
                            format={dateFormat}
                            onChange={onChangeSelectedDateValue}
                        />
                    </Col>
                    <Col span={4}>
                        <Button
                            className={"h3-margin"}
                            type={'primary'}
                            style={{
                                float: "right",
                            }}
                        >
                            조회
                        </Button>
                    </Col>
                </Row>
            </Card>
            <CustomKeplerMap
                heightRatio={70}
                id={"groupMap"}
            />
            <Card>
                <Table columns={columns}
                       dataSource={[]}
                       scroll={{y: 600}}
                       onRow={(record, rowIndex) => {
                           return {
                               onClick: (event) => {
                                   console.log(record)
                               }, // click row
                           };
                       }}
                />

            </Card>
        </div>
    )
};

export default GroupDestinationStatistics;

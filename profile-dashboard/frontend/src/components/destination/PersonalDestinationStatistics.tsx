import React, {useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import {useDispatch} from "react-redux";
import {deviceModel} from "@src/components/plugControl/types";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import {setSelectDate, setSelectDeviceGb} from "@src/actions/DeviceAction";
import DatePicker from "antd/lib/date-picker";
import dayjs, {Dayjs} from 'dayjs';
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import Table from "antd/lib/table";
import {addDataToMap, updateMap, toggleSidePanel} from "kepler.gl/actions";
import {store} from "@src/index";
import {processCsvData} from "kepler.gl/processors";
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
    const [selectedDateValue, setSelectedDateValue] = useState(dayjs().subtract(1, 'day'));

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
                id={"personalMap"}
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

export default PersonalDestinationStatistics;

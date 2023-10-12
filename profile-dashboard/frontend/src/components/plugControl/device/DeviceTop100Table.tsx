import React, {useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Table from "antd/lib/table";
import {useDispatch} from "react-redux";
import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";
import {deviceTop100Data, deviceTripData} from "@src/components/plugControl/types";
import {setSelectDeviceId} from "@src/actions/DeviceAction";

interface Props {
    deviceGb: string,
    deviceInfoList: any[],
    handleClickGetData: boolean
}

const DeviceTop100Table = (props: Props): React.ReactElement => {

    const dispatch = useDispatch();
    const [excelDownLoading, setExcelDownLoading] = useState(false);
    const [selectedDeviceModel, setSelectedDeviceModel] = useState("");

    useEffect(() => {
        setSelectedDeviceModel("");
    }, [props.deviceGb, props.handleClickGetData])


    const handleClickExcelDownload = async () => {
        setExcelDownLoading(true);

        const values = props.deviceInfoList.map((data) => {
            const tmpList = [];
            for (const [key, value] of Object.entries(data)) {
                tmpList.push(value);
            }
            return tmpList;
        });

        try {
            await downloadFileFromFrontendData(`/api/file/location/data`, {
                chartName: `DEVICE_${props.deviceGb}_Top100`,
                columns: deviceTop100Data,
                values: values
            });
        } catch (e) {
            NotifyError(e);
        }

        setExcelDownLoading(false);
    }

    const handleClickRowData = (record) => {
        dispatch(setSelectDeviceId(record.dvc_id))
    }

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
        },
        {
            title: '비정상 GPS 비율',
            dataIndex: 'invld_gps_cnt_ratio',
            align: 'center' as const,
        },
        {
            title: '서버 수신 지연시간 비율',
            dataIndex: 'invld_rcv_lag_time_ratio',
            align: 'center' as const,
        },
        {
            title: 'ZERO GPS TRIP 수',
            dataIndex: 'zero_trip_cnt',
            align: 'center' as const,
        },
        {
            title: 'ZERO GPS TRIP 비율',
            dataIndex: 'zero_trip_ratio',
            align: 'center' as const,
        },
        {
            title: '전체 트립 수',
            dataIndex: 'trip_cnt',
            width: 100,
            align: 'center' as const,
        },
        {
            title: '자동차 제조사 이름',
            dataIndex: 'cr_prd_cmpcd_nm',
            align: 'center' as const,
        },

    ];

    return (
        <div>
            <Card>
                <Button
                    type={'primary'}
                    disabled={excelDownLoading}
                    onClick={handleClickExcelDownload}
                    style={{float: "right"}}
                >
                    엑셀다운로드
                </Button>
                <Table columns={columns}
                       dataSource={props.deviceInfoList}
                       scroll={{y: 600}}
                       onRow={(record, rowIndex) => {
                           return {
                               onClick: (event) => {
                                   handleClickRowData(record)
                               }, // click row
                           };
                       }}
                />
            </Card>
        </div>
    )
};

export default DeviceTop100Table;

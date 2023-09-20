import React, {useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Table from "antd/lib/table";
import Tooltip from "antd/lib/tooltip";

import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";
import {get} from "@src/api";
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import {deviceTop100Data} from "@src/components/plugControl/types";

interface Props {
    deviceGb: string,
    deviceInfoList:any[],
    handleClickGetData: boolean
}

const DeviceTop100Table = (props: Props): React.ReactElement => {

    const [excelDownLoading, setExcelDownLoading] = useState(false);
    const [selectedDeviceModel, setSelectedDeviceModel] = useState("");
    const [loading, setLoading] = useState(false);
    const [tripInfo, setTripInfo] = useState([]);

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
                chartName: `${props.deviceGb}_Top100`,
                columns: deviceTop100Data,
                values: values
            });
        } catch (e) {
            NotifyError(e);
        }

        setExcelDownLoading(false);
    };
    const handleClickRowData = (record) => {
        console.log(record)
        setSelectedDeviceModel(record.key);
    }

    const getDailyTripDeviceInfo = (deviceGb) => {
        setLoading(true);
        get<any>(`/api/plug/device/top/${deviceGb}`)
            .then(jsonData => {
                setTripInfo(jsonData)
                setLoading(false);
            })
            .catch((error) => {
                NotifyError(error)
            })
    }

    useEffect(() => {
        const tableContainer = document.querySelector('.ant-card-body');
        if (tableContainer) {
            tableContainer.scrollTo({top: 3000, behavior: 'smooth'});

            //TODO 여기 트립 정보 가져오는 걸로 제대로 수정 해야 함.
            getDailyTripDeviceInfo(props.deviceGb)
        }
    }, [selectedDeviceModel]);

    useEffect(() => {
        setSelectedDeviceModel("");
    }, [props.deviceGb, props.handleClickGetData])

    return (
        <div>
            <Button
                type={'primary'}
                disabled={excelDownLoading}
                onClick={handleClickExcelDownload}
                style={{float: "right"}}
            >
                엑셀다운로드
            </Button>
            <Tooltip placement="topLeft" title={"Trip 개수가 2개 이상,Zero trip 비율 기준"} arrow={false}>
                <h3>
                    제조사별 디바이스 Top 100
                </h3>
            </Tooltip>
            <Table columns={columns}
                   dataSource={props.deviceInfoList}
                   scroll={{y: 600}}
                   loading={{
                       spinning: loading,
                       indicator: <LoadingOutlined/>,
                   }}
                   onRow={(record, rowIndex) => {
                       return {
                           onClick: (event) => {
                               handleClickRowData(record)
                           }, // click row
                       };
                   }}
            />
            <div>
                {selectedDeviceModel === "" ?
                    <div></div> :
                    <Card>
                        <Table
                            columns={columns}
                            dataSource={tripInfo}
                            scroll={{y: 600}}
                            loading={{
                                spinning: loading,
                                indicator: <LoadingOutlined/>,
                            }}
                        />
                    </Card>
                }
            </div>
        </div>
    )
};

export default DeviceTop100Table;

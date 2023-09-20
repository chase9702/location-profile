import React, {useEffect, useState} from "react";
import {Button, Card, Table, Tooltip} from "antd";
import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";
import {get} from "@src/api";
import {LoadingOutlined} from '@ant-design/icons';
import {deviceTop100Data} from "@src/components/plugControl/types";

interface Props {
    deviceGb: string,
    handleClickGetData: boolean
}

const DeviceTop100Table = (props: Props): React.ReactElement => {

    const [excelDownLoading, setExcelDownLoading] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState([]);
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


    useEffect(() => {
        getDailyDeviceInfo(props.deviceGb);
    }, [])
    useEffect(() => {
        setSelectedDeviceModel("");
        if (props.handleClickGetData == true) {
            getDailyDeviceInfo(props.deviceGb);
        } else {
            console.log("제조사 선택했다. ")
        }
    }, [props.deviceGb, props.handleClickGetData])

    const getDailyDeviceInfo = (deviceGb) => {
        setLoading(true);
        get<any>(`/api/plug/device/top/${deviceGb}`)
            .then(jsonData => {
                setDeviceInfo(jsonData)
                setLoading(false);
            })
            .catch((error) => {
                NotifyError(error)
            })
    }

    const handleClickExcelDownload = async () => {
        setExcelDownLoading(true);

        const values = deviceInfo.map((data) => {
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

            getDailyTripDeviceInfo("ALL")
        }


    }, [selectedDeviceModel]);

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
                   dataSource={deviceInfo}
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

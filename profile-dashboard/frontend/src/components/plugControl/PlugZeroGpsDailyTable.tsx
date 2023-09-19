import React, {useEffect, useState} from "react";
import {Spin, Table} from "antd";
import type {ColumnsType, TableProps} from 'antd/es/table';
import {get} from "@src/api";
import {LoadingOutlined} from "@ant-design/icons";


interface Props {

}

// interface DataType {
//     key: React.Key;
//     name: string;
//     age: number;
//     address: string;
// }

const PlugZeroGpsDailyTable = (props: Props): React.ReactElement => {
    const [zeroGpsDailyTableData, setZeroGpsDailyTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const uniqueDailyArray = [];
    const seenDailyKeys = new Set();

    useEffect(() => {
        zeroGpsDailyTableDataFetch();
    }, []);

    const zeroGpsDailyTableDataFetch = () => {
        get<[]>("/api/plug/statistic/zero-gps-trip-daily-info")
            .then((jsonData) => {
                setZeroGpsDailyTableData(jsonData)
            })
            .finally(() => {
                setLoading(false); // 로딩을 완료로 설정
            });
    };

    for (const item of zeroGpsDailyTableData) {
        if (!seenDailyKeys.has(item.bsDt)) {
            uniqueDailyArray.push({
                text: item.bsDt,
                value: item.bsDt,
            });
            seenDailyKeys.add(item.bsDt);
        }
    }

    const zeroGpsDailyColumn: ColumnsType<any> = [
        {
            title: '날짜',
            dataIndex: 'bsDt',
            align: 'center' as const,
            filters: uniqueDailyArray.map(option => ({
                text: option.text,
                value: option.value,
            })),
            onFilter: (value: string, record) => record.bsDt.indexOf(value) === 0,
        },
        {
            title: '제조사',
            dataIndex: 'dvcGb',
            align: 'center' as const,
            filters: [
                {
                    text: 'AMT',
                    value: 'AMT',
                },
                {
                    text: 'ETO',
                    value: 'ETO',
                },
                {
                    text: 'LUX',
                    value: 'LUX',
                },
                {
                    text: 'TLK',
                    value: 'TLK',
                },
                {
                    text: 'UNK',
                    value: 'UNK',
                },
            ],
            onFilter: (value: string, record) => record.dvcGb.indexOf(value) === 0,
        },
        {
            title: '모델명',
            dataIndex: 'dvcMdl',
            align: 'center' as const,
            filters: [
                {
                    text: 'AMT1',
                    value: 'AMT1',
                },
                {
                    text: 'ETO1',
                    value: 'ETO1',
                },
                {
                    text: 'LUX1',
                    value: 'LUX1',
                },
                {
                    text: 'LUX2',
                    value: 'LUX2',
                },
                {
                    text: 'TLK1',
                    value: 'TLK1',
                },
                {
                    text: 'UNK1',
                    value: 'UNK1',
                },
            ],
            onFilter: (value: string, record) => record.dvcMdl.indexOf(value) === 0,

        },
        {
            title: '전체트립',
            dataIndex: 'sumTotalTripCnt',
            align: 'center' as const,
        },
        {
            title: '정상트립',
            dataIndex: 'sumNormalTripCnt',
            align: 'center' as const,
        },
        {
            title: 'ZGPS트립',
            dataIndex: 'sumZeroTripCnt',
            align: 'center' as const,
        },
        {
            title: 'ZGPS비율',
            dataIndex: 'sumZeroTripRt',
            align: 'center' as const,
        },
        {
            title: '5-6분',
            dataIndex: 'sumZero360TripCnt',
            align: 'center' as const,
        },
        {
            title: '6-7분',
            dataIndex: 'sumZero420TripCnt',
            align: 'center' as const,
        },
        {
            title: '7-8분',
            dataIndex: 'sumZero480TripCnt',
            align: 'center' as const,
        },
        {
            title: '8-9분',
            dataIndex: 'sumZero540TripCnt',
            align: 'center' as const,
        },
        {
            title: '9-10분',
            dataIndex: 'sumZero600TripCnt',
            align: 'center' as const,
        },
        {
            title: '10-15분',
            dataIndex: 'sumZero900TripCnt',
            align: 'center' as const,
        },
        {
            title: '15-20분',
            dataIndex: 'sumZero1200TripCnt',
            align: 'center' as const,
        },
        {
            title: '20-25분',
            dataIndex: 'sumZero1500TripCnt',
            align: 'center' as const,
        },
        {
            title: '25-30분',
            dataIndex: 'sumZero1800TripCnt',
            align: 'center' as const,
        },
        {
            title: '30분이상',
            dataIndex: 'sumZero1800OverTripCnt',
            align: 'center' as const,
        },
    ];


    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div>
            <Spin spinning={loading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                <Table columns={zeroGpsDailyColumn} dataSource={zeroGpsDailyTableData} onChange={onChange}/>
            </Spin>

        </div>
    )
};

export default PlugZeroGpsDailyTable;

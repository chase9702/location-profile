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

const PlugInterpolationDailyTable = (props: Props): React.ReactElement => {

    const [interpolationDailyTableData, setInterpolationDailyTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const uniqueDailyArray = [];
    const seenDailyKeys = new Set();

    useEffect(() => {
        interpolationDailyTableDataFetch();
    }, []);

    const interpolationDailyTableDataFetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-daily-info")
            .then((jsonData) => {
                setInterpolationDailyTableData(jsonData)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    for (const item of interpolationDailyTableData) {
        if (!seenDailyKeys.has(item.bsDt)) {
            uniqueDailyArray.push({
                text: item.bsDt,
                value: item.bsDt,
            });
            seenDailyKeys.add(item.bsDt);
        }
    }

    const interpolationDailyColumn: ColumnsType<any> = [
        {
            title: '날짜',
            dataIndex: 'bsDt',
            filters: uniqueDailyArray.map(option => ({
                text: option.text,
                value: option.value,
            })),
            onFilter: (value: string, record) => record.bsDt.indexOf(value) === 0,
        },
        {
            title: '제조사',
            dataIndex: 'dvcGb',
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
            title: '디바이스 수',
            dataIndex: 'dvcCnt',
            align: 'center' as const,
        },
        {
            title: '전체거리',
            dataIndex: 'sumTotalDist',
        },
        {
            title: '정상거리',
            dataIndex: 'sumNormalDist',
        },
        {
            title: '보간거리',
            dataIndex: 'sumInterpolationDist',
        },
        {
            title: '보간거리비율',
            dataIndex: 'distInterpolationRt',
        },
        {
            title: '전체트립',
            dataIndex: 'sumTotalTripCnt',
        },
        {
            title: '정상트립',
            dataIndex: 'sumNormalTripCnt',
        },
        {
            title: '보간트립',
            dataIndex: 'sumInterpolationTripCnt',
        },
        {
            title: '보간트립비율',
            dataIndex: 'tripInterpolationRt',
        },
        {
            title: '0-1km',
            dataIndex: 'tripCnt1',
        },
        {
            title: '1-2km',
            dataIndex: 'tripCnt2',
        },
        {
            title: '2-3km',
            dataIndex: 'tripCnt3',
        },
        {
            title: '3-5km',
            dataIndex: 'tripCnt5',
        },
        {
            title: '5-7km',
            dataIndex: 'tripCnt7',
        },
        {
            title: '7-10km',
            dataIndex: 'tripCnt10',
        },
        {
            title: '10km이상',
            dataIndex: 'tripCnt10Over',
        },
    ];


    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div>
            <Spin spinning={loading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                <Table columns={interpolationDailyColumn} dataSource={interpolationDailyTableData} onChange={onChange}/>
            </Spin>
        </div>
    )
};

export default PlugInterpolationDailyTable;

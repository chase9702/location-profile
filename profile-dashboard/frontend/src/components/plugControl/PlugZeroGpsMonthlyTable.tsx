import React from "react";
import {Table} from "antd";
import type {ColumnsType, TableProps} from 'antd/es/table';


interface Props {

}

// interface DataType {
//     key: React.Key;
//     name: string;
//     age: number;
//     address: string;
// }

const PlugZeroGpsMonthlyTable = (props: { zeroGpsMonthlyTableData: any[] }): React.ReactElement => {
    const { zeroGpsMonthlyTableData } = props;
    const uniqueDailyArray = [];
    const seenDailyKeys = new Set();

    for (const item of zeroGpsMonthlyTableData) {
        if (!seenDailyKeys.has(item.bsDt)) {
            uniqueDailyArray.push({
                text: item.bsDt,
                value: item.bsDt,
            });
            seenDailyKeys.add(item.bsDt);
        }
    }

    const zeroGpsMonthlyColumn: ColumnsType<any> = [
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
    ];


    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div>
                <Table columns={zeroGpsMonthlyColumn} dataSource={zeroGpsMonthlyTableData} onChange={onChange}/>
        </div>
    )
};

export default PlugZeroGpsMonthlyTable;

import React, {useState} from "react";
import Table from "antd/lib/table";
import type {ColumnsType, TableProps} from 'antd/es/table';


interface Props {

}

// interface DataType {
//     key: React.Key;
//     name: string;
//     age: number;
//     address: string;
// }

const PlugInterpolationMonthlyTable = (props: { interpolationMonthlyTableData: any[] }): React.ReactElement => {

    const { interpolationMonthlyTableData } = props;
    const uniqueMonthlyArray = [];
    const seenMonthlyKeys = new Set();

    for (const item of interpolationMonthlyTableData) {
        if (!seenMonthlyKeys.has(item.bsDt)) {
            uniqueMonthlyArray.push({
                text: item.bsDt,
                value: item.bsDt,
            });
            seenMonthlyKeys.add(item.bsDt);
        }
    }


    const interpolationMonthlyColumn: ColumnsType<any> = [
        {
            title: '날짜',
            dataIndex: 'bsDt',
            align: 'center' as const,
            filters: uniqueMonthlyArray.map(option => ({
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
            title: '디바이스 수',
            dataIndex: 'dvcCnt',
            align: 'center' as const,
        },
        {
            title: '전체거리',
            dataIndex: 'sumTotalDist',
            align: 'center' as const,
        },
        {
            title: '정상거리',
            dataIndex: 'sumNormalDist',
            align: 'center' as const,
        },
        {
            title: '보간거리',
            dataIndex: 'sumInterpolationDist',
            align: 'center' as const,
        },
        {
            title: '보간거리비율',
            dataIndex: 'distInterpolationRt',
            align: 'center' as const,
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
            title: '보간트립',
            dataIndex: 'sumInterpolationTripCnt',
            align: 'center' as const,
        },
        {
            title: '보간트립비율',
            dataIndex: 'sumInterpolationTripRt',
            align: 'center' as const,
        },
    ];


    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div>
                <Table columns={interpolationMonthlyColumn} dataSource={interpolationMonthlyTableData}
                       onChange={onChange}/>
        </div>
    )
};

export default PlugInterpolationMonthlyTable;

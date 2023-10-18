import React from "react";
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
        if (!seenMonthlyKeys.has(item.bs_dt)) {
            uniqueMonthlyArray.push({
                text: item.bs_dt,
                value: item.bs_dt,
            });
            seenMonthlyKeys.add(item.bs_dt);
        }
    }


    const interpolationMonthlyColumn: ColumnsType<any> = [
        {
            title: '날짜',
            dataIndex: 'bs_dt',
            align: 'center' as const,
            filters: uniqueMonthlyArray.map(option => ({
                text: option.text,
                value: option.value,
            })),
            onFilter: (value: string, record) => record.bs_dt.indexOf(value) === 0,
        },
        {
            title: '제조사',
            dataIndex: 'dvc_gb',
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
            onFilter: (value: string, record) => record.dvc_gb.indexOf(value) === 0,
        },
        {
            title: '모델명',
            dataIndex: 'dvc_mdl',
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
            onFilter: (value: string, record) => record.dvc_mdl.indexOf(value) === 0,

        },
        {
            title: '디바이스 수',
            dataIndex: 'dvc_cnt',
            align: 'center' as const,
        },
        {
            title: '전체거리',
            dataIndex: 'sum_total_dist',
            align: 'center' as const,
        },
        {
            title: '정상거리',
            dataIndex: 'sum_normal_dist',
            align: 'center' as const,
        },
        {
            title: '보간거리',
            dataIndex: 'sum_interpolation_dist',
            align: 'center' as const,
        },
        {
            title: '보간거리비율',
            dataIndex: 'dist_interpolation_rt',
            align: 'center' as const,
        },
        {
            title: '전체트립',
            dataIndex: 'sum_total_trip_cnt',
            align: 'center' as const,
        },
        {
            title: '정상트립',
            dataIndex: 'sum_normal_trip_cnt',
            align: 'center' as const,
        },
        {
            title: '보간트립',
            dataIndex: 'sum_interpolation_trip_cnt',
            align: 'center' as const,
        },
        {
            title: '보간트립비율',
            dataIndex: 'sum_interpolation_trip_rt',
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

import React from "react";
import Table from "antd/lib/table";
import type {ColumnsType, TableProps} from 'antd/es/table';


interface Props {

}

const PlugZeroGpsMonthlyTable = (props: { zeroGpsMonthlyTableData: any[] }): React.ReactElement => {

    const {zeroGpsMonthlyTableData} = props;
    const uniqueDailyArray = [];
    const seenDailyKeys = new Set();

    for (const item of zeroGpsMonthlyTableData) {
        if (!seenDailyKeys.has(item.bs_dt)) {
            uniqueDailyArray.push({
                text: item.bs_dt,
                value: item.bs_dt,
            });
            seenDailyKeys.add(item.bs_dt);
        }
    }

    const zeroGpsMonthlyColumn: ColumnsType<any> = [
        {
            title: '날짜',
            dataIndex: 'bs_dt',
            align: 'center' as const,
            filters: uniqueDailyArray.map(option => ({
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
            title: 'ZGPS트립',
            dataIndex: 'sum_zero_trip_cnt',
            align: 'center' as const,
        },
        {
            title: 'ZGPS비율',
            dataIndex: 'sum_zero_trip_rt',
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

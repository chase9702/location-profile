import React from "react";
import {Table} from "antd";
import type {ColumnsType, TableProps} from 'antd/es/table';


interface Props {

}

const PlugInterpolationDailyTable = (props: { interpolationDailyTableData: any[] }): React.ReactElement => {

    const { interpolationDailyTableData } = props;
    const uniqueDailyArray = [];
    const seenDailyKeys = new Set();
    console.log("Table Data")
    console.log(interpolationDailyTableData)
    console.log(uniqueDailyArray)

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
            dataIndex: 'tripInterpolationRt',
            align: 'center' as const,
        },
        {
            title: '0-1km',
            dataIndex: 'tripCnt1',
            align: 'center' as const,
        },
        {
            title: '1-2km',
            dataIndex: 'tripCnt2',
            align: 'center' as const,
        },
        {
            title: '2-3km',
            dataIndex: 'tripCnt3',
            align: 'center' as const,
        },
        {
            title: '3-5km',
            dataIndex: 'tripCnt5',
            align: 'center' as const,
        },
        {
            title: '5-7km',
            dataIndex: 'tripCnt7',
            align: 'center' as const,
        },
        {
            title: '7-10km',
            dataIndex: 'tripCnt10',
            align: 'center' as const,
        },
        {
            title: '10km이상',
            dataIndex: 'tripCnt10Over',
            align: 'center' as const,
        },
    ];


    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div>
            {/*<Spin spinning={loading} indicator={<LoadingOutlined/>} tip="로딩 중...">*/}
                <Table columns={interpolationDailyColumn} dataSource={interpolationDailyTableData} onChange={onChange}/>
            {/*</Spin>*/}
        </div>
    )
};

export default PlugInterpolationDailyTable;

import React, {useEffect, useState} from "react";
import {Card, Table, Tabs} from "antd";
import type { ColumnsType, TableProps } from 'antd/es/table';
import {get} from "@src/api";
import _ from 'lodash';
import TabPane from "antd/es/tabs/TabPane";
import {Column} from "@ant-design/plots";


interface Props {

}

// interface DataType {
//     key: React.Key;
//     name: string;
//     age: number;
//     address: string;
// }

const PlugInterpolationDailyTableChart = (props: Props): React.ReactElement => {

    const uniqueArray = [];
    const seenKeys = new Set();
    const [interpolationTableData, setInterpolationData] = useState([]);
    const interpolationGroupData = _.groupBy(interpolationTableData, (item) => `${item.dvc_mdl}-${item.bs_dt}`);

    useEffect(() => {
        interpolationTableDataFetch();
    }, []);

    const interpolationTableDataFetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-daily-info")
            .then((jsonData) => {
                console.log(jsonData)
                setInterpolationData(jsonData)
            })
    };

    for (const item of interpolationTableData) {
        if (!seenKeys.has(item.bs_dt)) {
            uniqueArray.push({
                text: item.bs_dt,
                value: item.bs_dt,
            });
            seenKeys.add(item.bs_dt);
        }
    }

    const interpolationChartData = _.map(interpolationGroupData, (group) => {
        const sumTotalcnt = _.sumBy(group, 'sum_total_trip_cnt');
        const sum02TripCnt = _.sumBy(group, 'sum_02_trip_cnt');

        const ratio = sumTotalcnt !== 0 ? (sum02TripCnt / sumTotalcnt) * 100 : 0;

        return {
            dvc_mdl: group[0].dvc_mdl,
            bs_dt: group[0].bs_dt,
            ratio: ratio.toFixed(2),
        };
    });

    console.log(interpolationChartData);

    const columns: ColumnsType<any> = [
        {
            title: '날짜',
            dataIndex: 'bs_dt',
            filters: uniqueArray.map(option => ({
                text: option.text,
                value: option.value,})),
        },
        {
            title: '제조사',
            dataIndex: 'dvc_gb',
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
            dataIndex: 'divc_cnt',
        },
        {
            title: '전체거리',
            dataIndex: 'sum_total_dist',
        },
        {
            title: '정상거리',
            dataIndex: 'sum_01_dist',
        },
        {
            title: '보간거리',
            dataIndex: 'sum_02_dist',
        },
        {
            title: '보간거리비율',
            dataIndex: 'dist_02_rt',
        },
        {
            title: '전체트립',
            dataIndex: 'sum_total_trip_cnt',
        },
        {
            title: '정상트립',
            dataIndex: 'sum_01_trip_cnt',
        },
        {
            title: '보간트립',
            dataIndex: 'sum_02_trip_cnt',
        },
        {
            title: '보간트립비율',
            dataIndex: 'trip_rt',
        },
        {
            title: '0-1km',
            dataIndex: 'trip_cnt_1',
        },
        {
            title: '1-2km',
            dataIndex: 'trip_cnt_2',
        },
        {
            title: '2-3km',
            dataIndex: 'trip_cnt_3',
        },
        {
            title: '3-5km',
            dataIndex: 'trip_cnt_5',
        },
        {
            title: '5-7km',
            dataIndex: 'trip_cnt_7',
        },
        {
            title: '7-10km',
            dataIndex: 'trip_cnt_10',
        },
        {
            title: '10km이상',
            dataIndex: 'trip_cnt_10_over',
        },
    ];

    const interpolationChartConfig = {
        data: interpolationGroupData,
        xField: 'ba_dt',
        yField: 'trip_rt',
        seriesField: 'dvc_gb',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        label: {
            position: 'middle',
            content: (item) => `${item.trip_rt}`, // 각 데이터의 값을 라벨로 표시
            style: {
                fill: '#000', // 라벨 색상 설정
                fontSize: 12,
            },
        },
    };


    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div>
            <Table columns={columns} dataSource={interpolationTableData} onChange={onChange}/>
        </div>
    )
};

export default PlugInterpolationDailyTableChart;

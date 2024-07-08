import React from 'react';
import Table from 'antd/lib/table';
import type { ColumnsType, TableProps } from 'antd/es/table';
// interface DataType {
//     key: React.Key;
//     name: string;
//     age: number;
//     address: string;
// }

const PlugZeroGpsDailyTable = (props: {
  zeroGpsDailyTableData: any[];
}): React.ReactElement => {
  const { zeroGpsDailyTableData } = props;
  const uniqueDailyArray = [];
  const seenDailyKeys = new Set();

  for (const item of zeroGpsDailyTableData) {
    if (!seenDailyKeys.has(item.bs_dt)) {
      uniqueDailyArray.push({
        text: item.bs_dt,
        value: item.bs_dt,
      });
      seenDailyKeys.add(item.bs_dt);
    }
  }

  const zeroGpsDailyColumn: ColumnsType<any> = [
    {
      title: '날짜',
      dataIndex: 'bs_dt',
      align: 'center' as const,
      filters: uniqueDailyArray.map((option) => ({
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
      title: 'Zero 트립',
      dataIndex: 'sum_zero_trip_cnt',
      align: 'center' as const,
    },
    {
      title: 'Zero 트립비율',
      dataIndex: 'sum_zero_trip_rt',
      align: 'center' as const,
    },
    {
      title: '5-6분',
      dataIndex: 'sum_zero360_trip_cnt',
      align: 'center' as const,
    },
    {
      title: '6-7분',
      dataIndex: 'sum_zero420_trip_cnt',
      align: 'center' as const,
    },
    {
      title: '7-8분',
      dataIndex: 'sum_zero480_trip_cnt',
      align: 'center' as const,
    },
    {
      title: '8-9분',
      dataIndex: 'sum_zero540_trip_cnt',
      align: 'center' as const,
    },
    {
      title: '9-10분',
      dataIndex: 'sum_zero600_trip_cnt',
      align: 'center' as const,
    },
    {
      title: '10-15분',
      dataIndex: 'sum_zero900_trip_cnt',
      align: 'center' as const,
    },
    {
      title: '15-20분',
      dataIndex: 'sum_zero1200_trip_cnt',
      align: 'center' as const,
    },
    {
      title: '20-25분',
      dataIndex: 'sum_zero1500_trip_cnt',
      align: 'center' as const,
    },
    {
      title: '25-30분',
      dataIndex: 'sum_zero1800_trip_cnt',
      align: 'center' as const,
    },
    {
      title: '30분이상',
      dataIndex: 'sum_zero1800_over_trip_cnt',
      align: 'center' as const,
    },
  ];

  const onChange: TableProps<any>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Table
        columns={zeroGpsDailyColumn}
        dataSource={zeroGpsDailyTableData}
        onChange={onChange}
      />
    </div>
  );
};

export default PlugZeroGpsDailyTable;

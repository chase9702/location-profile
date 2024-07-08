import React, { useEffect, useState } from 'react';
import Table from 'antd/lib/table';
import {
  aiColumns,
  AiMetaData,
  bbiColumns,
  BBIMetaData,
  ExtendedPublicMetaData,
  publicColumns,
} from '@src/components/monitoring/map/data-types';
import { TableProps } from 'antd/es/table';
import TabPane from 'antd/es/tabs/TabPane';
import Tabs from 'antd/lib/tabs';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Spin from 'antd/lib/spin';

type TablePagination<T extends object> = NonNullable<
  Exclude<TableProps<T>['pagination'], boolean>
>;
type TablePaginationPosition = NonNullable<
  TablePagination<any>['position']
>[number];

interface Props {
  loading: boolean;
  bbiMetaList: BBIMetaData[];
  publicMetaList: ExtendedPublicMetaData[];
  aiMetaList: AiMetaData[];
}

const MonitoringMetaTable = (props: Props): React.ReactElement => {
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter');

  useEffect(() => {
    console.log(props.bbiMetaList);
  }, [props.bbiMetaList]);

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="BBI META" key="1">
          <Spin
            spinning={props.loading}
            indicator={<LoadingOutlined />}
            tip="로딩 중..."
          >
            <Table
              columns={bbiColumns}
              dataSource={props.bbiMetaList}
              scroll={{ y: 500 }}
              pagination={{ position: [bottom] }}
            />
          </Spin>
        </TabPane>
        <TabPane tab="공공사고 META" key="2">
          <Table
            columns={publicColumns}
            dataSource={props.publicMetaList}
            scroll={{ y: 500 }}
            pagination={{ position: [bottom] }}
          />
        </TabPane>
        <TabPane tab="사고인지 META" key="3">
          <Table
            columns={aiColumns}
            dataSource={props.aiMetaList}
            scroll={{ y: 500 }}
            pagination={{ position: [bottom] }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MonitoringMetaTable;

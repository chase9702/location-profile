import React from 'react';
import PageTitle from '@src/components/common/PageTitle';
import Card from 'antd/lib/card';
import MonitoringTop100 from '@src/components/monitoring/map/MonitoringTop100';
import { Anchor, Col, Row } from 'antd';
import MonitoringDeviceChart from '@src/components/monitoring/MonitoringDeviceChart';
import MonitoringBbiChart from '@src/components/monitoring/MonitoringBbiChart';
import MonitoringAiChart from '@src/components/monitoring/MonitoringAiChart';

const MonitoringDashBoard = (): React.ReactElement => {
  return (
    <div>
      {/*<PageTitle*/}
      {/*  title="BBI, AI 모니터링"*/}
      {/*  description={[*/}
      {/*    'BBI, AI, 이상 디바이스에 대한 데이터를 확인할 수 있습니다.',*/}
      {/*    'Kepler 지도로 위치 데이터를 확인할 수 있습니다.',*/}
      {/*  ]}*/}
      {/*/>*/}
      <div>
        <Anchor
          direction="horizontal"
          offsetTop={75}
          items={[
            {
              key: 'part-1',
              href: '#part-1',
              title: '이상 Device',
            },
            {
              key: 'part-2',
              href: '#part-2',
              title: 'BBI & AI',
            },
            {
              key: 'part-3',
              href: '#part-3',
              title: 'Top100지도',
            },
          ]}
        />
      </div>
      <div>
        <Card
          id="part-1"
          style={{
            height: '100vh',
          }}
        >
          <MonitoringDeviceChart />
        </Card>
        <Card
          id="part-2"
          style={{
            height: '100vh',
          }}
        >
          <div
            style={{
              padding: '10px',
              height: '50vh',
            }}
          >
            <MonitoringBbiChart />
          </div>
          <div
            style={{
              padding: '10px',
              height: '50vh',
            }}
          >
            <MonitoringAiChart />
          </div>
        </Card>
        <Card
          id="part-3"
          style={{
            height: '100vh',
          }}
        >
          <div style={{ padding: '10px' }}>
            <MonitoringTop100 />
          </div>
        </Card>
      </div>
      {/*<Card>*/}
      {/*  <Tabs defaultActiveKey="1">*/}
      {/*    <TabPane tab="이상디바이스" key="1">*/}
      {/*      <MonitoringDeviceChart />*/}
      {/*    </TabPane>*/}
      {/*    <TabPane tab="BBI" key="2">*/}
      {/*      <Row gutter={16}>*/}
      {/*        <Col span={12}>*/}
      {/*          <div style={{ padding: '10px' }}>*/}
      {/*            <MonitoringBbiChart />*/}
      {/*          </div>*/}
      {/*        </Col>*/}
      {/*        <Col span={12}>*/}
      {/*          <div style={{ padding: '10px' }}>*/}
      {/*            <MonitoringAiChart />*/}
      {/*          </div>*/}
      {/*        </Col>*/}
      {/*      </Row>*/}
      {/*    </TabPane>*/}
      {/*    <TabPane tab="Top100 지도" key="3">*/}
      {/*      <MonitoringTop100 />*/}
      {/*    </TabPane>*/}
      {/*  </Tabs>*/}
      {/*</Card>*/}
    </div>
  );
};

export default MonitoringDashBoard;

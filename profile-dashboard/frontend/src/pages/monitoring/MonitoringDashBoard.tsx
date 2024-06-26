import React from "react";
import PageTitle from "@src/components/common/PageTitle";
import Card from "antd/lib/card";
import MonitoringTop100 from "@src/components/monitoring/map/MonitoringTop100";
import {Col, Row} from "antd";
import MonitoringDeviceChart from "@src/components/monitoring/MonitoringDeviceChart";
import MonitoringBbiChart from "@src/components/monitoring/MonitoringBbiChart";
import MonitoringAiChart from "@src/components/monitoring/MonitoringAiChart";

interface State {
}

interface Props {

}

const MonitoringDashBoard = (props: Props): React.ReactElement => {

    return (
        <div>
            <PageTitle
                title="BBI, AI 모니터링"
                description={[
                    'BBI, AI, 이상 디바이스에 대한 데이터를 확인할 수 있습니다.',
                    'Kepler 지도로 위치 데이터를 확인할 수 있습니다.',
                ]}
            />
            <Card style={{padding: '10px'}}>
                <Row gutter={16}>
                    <Col span={24}>
                        <div style={{padding: '10px'}}>
                            <MonitoringDeviceChart/>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <div style={{padding: '10px'}}>
                            <MonitoringBbiChart/>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{padding: '10px'}}>
                            <MonitoringAiChart/>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <div style={{padding: '10px'}}>
                            <MonitoringTop100/>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )


};

export default MonitoringDashBoard
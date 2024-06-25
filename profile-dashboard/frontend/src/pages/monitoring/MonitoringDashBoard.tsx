import React from "react";
import PageTitle from "@src/components/common/PageTitle";
import Card from "antd/lib/card";
import MonitoringMap from "@src/components/monitoring/MonitoringMap";
import MonitoringRingStatistics from "@src/components/monitoring/MonitoringRingStatistics";
import {Col, Row} from "antd";
import MonitoringColumnStatistics from "@src/components/monitoring/MonitoringColumnStatistics";
import MonitoringColumnDevice from "@src/components/monitoring/MonitoringLineStatistics";
import MonitoringAddressBarStatistics from "@src/components/monitoring/MonitoringAddressBarStatistics";
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
                title="타이틀 들어갈 곳"
                description={[
                    '목적지 통계 데이터를 확인할 수 있습니다.',
                    '그룹, 개인 통계를 각각 확인 할 수 있습니다.',
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
                            <MonitoringMap/>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )


};

export default MonitoringDashBoard
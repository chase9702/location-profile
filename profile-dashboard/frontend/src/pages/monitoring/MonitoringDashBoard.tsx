import React from "react";
import PageTitle from "@src/components/common/PageTitle";
import Card from "antd/lib/card";
import MonitoringTop100 from "@src/components/monitoring/map/MonitoringTop100";
import {Col, Row} from "antd";
import MonitoringLineStatistics from "@src/components/monitoring/MonitoringLineStatistics";

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
                            <MonitoringLineStatistics/>
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
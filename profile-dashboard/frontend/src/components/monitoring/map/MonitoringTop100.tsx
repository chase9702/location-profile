import React from "react";
import {Card, Col, Row} from "antd";
import MonitoringTop100Table from "@src/components/monitoring/map/MonitoringTop100Table";
import MonitoringTop100Map from "@src/components/monitoring/map/MonitoringTop100Map";

const MonitoringTop100 = (): React.ReactElement => {

    return (
        <div>
            <Card>
                <h3>Top100</h3>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card style={{height: '800px', overflowY: 'auto'}}>
                            <MonitoringTop100Table/>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card style={{height: '800px', overflowY: 'auto'}}>
                            <MonitoringTop100Map/>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    )
};

export default MonitoringTop100;


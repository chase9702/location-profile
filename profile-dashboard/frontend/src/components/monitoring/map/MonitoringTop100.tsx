import React from "react";
import {Card, Col, Row} from "antd";
import MonitoringTop100Table from "@src/components/monitoring/map/MonitoringTop100Table";

const MonitoringTop100 = (): React.ReactElement => {

    return (
        <div>
            <h3>Top100</h3>
            <Row gutter={16}>
                <Col span={24}>
                    <Card style={{height: '800px', overflowY: 'auto'}}>
                        <MonitoringTop100Table/>
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default MonitoringTop100;


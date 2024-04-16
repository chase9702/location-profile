import React from "react";
import Card from "antd/lib/card";
import {Tiny} from '@ant-design/plots';
import {Col, Row} from "antd";

interface Props {

}

const MonitoringRingStatistics = (props: Props): React.ReactElement => {


    const percent = 0.7;
    const config = {
        percent,
        width: 180,
        height: 180,
        color: ['#E8EFF5', '#66AFF4'],
        tooltip: {
            title: 'Data',
            items: [{channel: 'x'}, {channel: 'y'}]
        },
        onReady: ({chart}) => {
            chart.on(`element:click`, (ev) => {
                console.log(ev);
            });
        },
        annotations: [
            {
                type: 'text',
                style: {
                    text: `${percent * 100}%`,
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 16,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    return (
        <div>
            <div style={{textAlign: 'center'}}>
                <Row justify={"center"}>
                    <Col span={8}>
                        <h3>급출발</h3>
                        <Tiny.Ring {...config} />
                    </Col>
                    <Col span={8}>
                        <h3>급가속</h3>
                        <Tiny.Ring {...config} />
                    </Col>
                    <Col span={8}>
                        <h3>급감속</h3>
                        <Tiny.Ring {...config} />
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col span={12}>
                        <h3>급정지</h3>
                        <Tiny.Ring {...config} />
                    </Col>
                    <Col span={12}>
                        <h3>사고 횟수</h3>
                        <Tiny.Ring {...config} />
                    </Col>
                </Row>
            </div>

        </div>
    )
};

export default MonitoringRingStatistics;

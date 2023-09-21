import React, {useEffect, useState} from "react";
import Card from "antd/lib/card";
import Box from '@ant-design/plots/lib/components/box';
import {boxPlotField} from "@src/components/plugControl/types";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Column from "@ant-design/plots/lib/components/column";

interface Props {
    deviceDataList: any[],
    tripDataList: any[],
    selectedDeviceId: string
}

const DeviceTopTripChart = (props: Props): React.ReactElement => {

    const [deviceTpBoxChartData, setDeviceTpBoxChartData] = useState([]);
    const [deviceViBoxChartData, setDeviceViBoxChartData] = useState([]);
    const [deviceVxBoxChartData, setDeviceVxBoxChartData] = useState([]);

    const [deviceRsColumnChartData, setDeviceRsColumnChartData] = useState([]);
    const [deviceAcColumnChartData, setDeviceAcColumnChartData] = useState([]);
    const [deviceRatioColumnChartData, setDeviceRatioColumnChartData] = useState([]);


    useEffect(() => {
        makeBoxChartData()
        makeColumnChartData()
    }, [])

    const makeBoxChartData = () => {

        let tpDataList = [];
        let viDataList = [];
        let vxDataList = [];
        props.deviceDataList.forEach(data => {
            if (data.dvc_id === props.selectedDeviceId) {
                tpDataList.push({
                    x: data.dvc_id,
                    max: data.tp_max,
                    'mean+1std': (data.tp_mean + data.tp_std),
                    mean: data.tp_mean,
                    'mean-1std': (data.tp_mean - data.tp_std),
                    min: data.tp_min
                })
                viDataList.push({
                    x: data.dvc_id,
                    max: data.vi_max,
                    'mean+1std': (data.vi_mean + data.vi_std),
                    mean: data.vi_mean,
                    'mean-1std': (data.vi_mean - data.vi_std),
                    min: data.vi_min
                })
                vxDataList.push({
                    x: data.dvc_id,
                    max: data.vx_max,
                    'mean+1std': (data.vx_mean + data.vx_std),
                    mean: data.vx_mean,
                    'mean-1std': (data.vx_mean - data.vx_std),
                    min: data.vx_min
                })
            }
        })
        setDeviceTpBoxChartData(tpDataList)
        setDeviceViBoxChartData(viDataList)
        setDeviceVxBoxChartData(vxDataList)
    }

    const makeColumnChartData = () => {

        let rsDataList = [];
        let acDataList = [];
        let ratioDataList = [];

        props.deviceDataList.forEach(data => {
            if (data.dvc_id === props.selectedDeviceId) {
                debugger

                for (const key in data) {
                    if (key.startsWith('rs')) {
                        rsDataList.push({
                            type: key,
                            value: data[key]
                        });
                    }
                    if (key.startsWith('ac')) {
                        acDataList.push({
                            type: key,
                            value: data[key]
                        });
                    }
                    if(key.startsWith('zero_trip_ratio') || key.startsWith('invld_gps_cnt_ratio')){
                        ratioDataList.push({
                            type:key,
                            value:data[key]
                        })
                    }
                }
            }
        })
        setDeviceRsColumnChartData(rsDataList)
        setDeviceAcColumnChartData(acDataList)
        setDeviceRatioColumnChartData(ratioDataList)
    }

    const tpBoxConfig = {
        data: deviceTpBoxChartData,
        xField: 'x',
        yField: boxPlotField,
        boxStyle: {
            stroke: '#545454',
            fill: '#1890FF',
            fillOpacity: 0.3,
        },
        legend: {
            layout: 'horizontal',
            position: 'right'
        },
        animation: false,
    };

    const viBoxConfig = {
        data: deviceViBoxChartData,
        xField: 'x',
        yField: boxPlotField,
        boxStyle: {
            stroke: '#545454',
            fill: '#cc7ae8',
            fillOpacity: 0.3,
        },
        // xAxis: {
        //     grid: {
        //         line: {
        //             style: {
        //                 stroke: 'black',
        //                 lineWidth: 2,
        //                 lineDash: [4, 5],
        //                 strokeOpacity: 0.7,
        //                 shadowColor: 'black',
        //                 shadowBlur: 10,
        //                 shadowOffsetX: 5,
        //                 shadowOffsetY: 5,
        //                 cursor: 'pointer'
        //             }
        //         }
        //     }
        // },
        legend: {
            layout: 'horizontal',
            position: 'right'
        },
        animation: false,
    };

    const vxBoxConfig = {
        data: deviceVxBoxChartData,
        xField: 'x',
        yField: boxPlotField,
        boxStyle: {
            stroke: '#545454',
            fill: '#ffe018',
            fillOpacity: 0.3,
        },
        legend: {
            layout: 'horizontal',
            position: 'right'
        },
        animation: false,
    };


    const data = [
        {
            type: 'rs-0',
            value: 38,
        },
        {
            type: 'rs-1',
            value: 52,
        },
        {
            type: 'rs-2',
            value: 61,
        },
    ];
    const rsColumnConfig = {
        data: deviceRsColumnChartData,
        xField: 'type',
        yField: 'value',
        // seriesField: 'dvcMdl',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        color: '#a8ddb5',
        label: {
            position: 'middle',
            content: (item) => `${item.value}`,
            style: {
                fill: '#000',
                fontSize: 12,
            },
        },
    };
    const acColumnConfig = {
        data: deviceAcColumnChartData,
        xField: 'type',
        yField: 'value',
        // seriesField: 'dvcMdl',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        color: '#66acde',
        label: {
            position: 'middle',
            content: (item) => `${item.value}`,
            style: {
                fill: '#000',
                fontSize: 10,
            },
        },
    };
    const ratioColumnConfig = {
        data: deviceRatioColumnChartData,
        xField: 'type',
        yField: 'value',
        // seriesField: 'dvcMdl',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        color: '#e36997',
        label: {
            position: 'middle',
            content: (item) => `${item.value}`,
            style: {
                fill: '#000',
                fontSize: 12,
            },
        },
    };

    return (
        <div>
            <Card>

                <h2>디바이스 차트</h2>
                <Row gutter={16}>
                    <Col span={8}>
                        <h3>플러그 온도</h3>
                        <Box {...tpBoxConfig} />
                    </Col>
                    <Col span={8}>
                        <h3>초당 최소 전압</h3>
                        <Box {...viBoxConfig} />
                    </Col>
                    <Col span={8}>
                        <h3>초당 최대 전압</h3>
                        <Box {...vxBoxConfig} />
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <h3>통신 신호 강도</h3>
                        <Column {...rsColumnConfig} />
                    </Col>
                    <Col span={8}>
                        <h3>위치 정확도</h3>
                        <Column {...acColumnConfig} />
                    </Col>
                    <Col span={8}>
                        <h3>Zero trip ratio & 비정상 gps ratio </h3>
                        <Column {...ratioColumnConfig} />
                    </Col>
                </Row>


            </Card>
        </div>
    )
};

export default DeviceTopTripChart;

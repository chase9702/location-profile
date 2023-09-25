import React, {useEffect, useState} from 'react';
import {boxPlotField} from "@src/components/plugControl/types";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Card from "antd/lib/card";
import Box from "@ant-design/plots/lib/components/box";
import Column from "@ant-design/plots/lib/components/column";
import {numberFormat} from "@src/common/utils";


interface Props {
    title: string,
    deviceDataList: any[],
    selectedDeviceId: string
}

const DeviceStatisticChart = (props: Props): React.ReactElement => {

    const [deviceTpBoxChartData, setDeviceTpBoxChartData] = useState([]);
    const [deviceViBoxChartData, setDeviceViBoxChartData] = useState([]);
    const [deviceVxBoxChartData, setDeviceVxBoxChartData] = useState([]);
    const [plugMinValue, setPlugMinValue] = useState(0);
    const [viMinValue, setViMinValue] = useState(0);
    const [vxMinValue, setVxMinValue] = useState(0);

    const [deviceRsColumnChartData, setDeviceRsColumnChartData] = useState([]);
    const [deviceAcColumnChartData, setDeviceAcColumnChartData] = useState([]);
    const [deviceRatioColumnChartData, setDeviceRatioColumnChartData] = useState([]);


    useEffect(() => {

        if (props.title.startsWith("디바이스")) {
            makeBoxChartData(props.deviceDataList)
            makeColumnChartData(props.deviceDataList)
        }

    }, [])

    const makeBoxChartData = (dataList: any[]) => {

        let tpDataList = [];
        let viDataList = [];
        let vxDataList = [];
        dataList.forEach(data => {
            if (data.dvc_id === props.selectedDeviceId) {
                tpDataList.push({
                    x: data.dvc_id,
                    max: parseFloat(data.tp_max.toFixed(4)),
                    'mean+1std': parseFloat((data.tp_mean + data.tp_std).toFixed(4)),
                    mean: parseFloat(data.tp_mean.toFixed(4)),
                    'mean-1std': parseFloat((data.tp_mean - data.tp_std).toFixed(4)),
                    min: parseFloat(data.tp_min.toFixed(4))
                })
                viDataList.push({
                    x: data.dvc_id,
                    max: parseFloat(data.vi_max.toFixed(4)),
                    'mean+1std': parseFloat((data.vi_mean + data.vi_std).toFixed(4)),
                    mean: parseFloat(data.vi_mean.toFixed(4)),
                    'mean-1std': parseFloat((data.vi_mean - data.vi_std).toFixed(4)),
                    min: parseFloat(data.vi_min.toFixed(4))
                })
                vxDataList.push({
                    x: data.dvc_id,
                    max: parseFloat(data.vx_max.toFixed(4)),
                    'mean+1std': parseFloat((data.vx_mean + data.vx_std).toFixed(4)),
                    mean: parseFloat(data.vx_mean.toFixed(4)),
                    'mean-1std': parseFloat((data.vx_mean - data.vx_std).toFixed(4)),
                    min: parseFloat(data.vx_min.toFixed(4))
                })
            }
        })

        if (tpDataList.length > 0 && viDataList.length > 0 && vxDataList.length > 0) {
            setPlugMinValue(tpDataList[0].min)
            setViMinValue(viDataList[0].min)
            setVxMinValue(vxDataList[0].min)
        }

        setDeviceTpBoxChartData(tpDataList)
        setDeviceViBoxChartData(viDataList)
        setDeviceVxBoxChartData(vxDataList)
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
        yAxis: {
            title: {
                text: '온도'
            },
            minLimit: Math.floor(plugMinValue) - 10
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
        yAxis: {
            title: {
                text: '전압'
            },
            minLimit: Math.floor(viMinValue) - 1
        },
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
        yAxis: {
            title: {
                text: '전압'
            },
            minLimit: Math.floor(vxMinValue) - 1
        },
        legend: {
            layout: 'horizontal',
            position: 'right'
        },
        animation: false,
    };
    const makeColumnChartData = (dataList: any[]) => {

        let rsDataList = [];
        let acDataList = [];
        let ratioDataList = [];

        dataList.forEach(data => {
            if (data.dvc_id === props.selectedDeviceId) {
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
                    if (key.startsWith('zero_trip_ratio') || key.startsWith('invld_gps_cnt_ratio')) {
                        ratioDataList.push({
                            type: key,
                            value: parseFloat((data[key]).toFixed(4))
                        })
                    }
                }
            }
        })
        setDeviceRsColumnChartData(rsDataList)
        setDeviceAcColumnChartData(acDataList)
        setDeviceRatioColumnChartData(ratioDataList)
    }

    const rsColumnConfig = {
        data: deviceRsColumnChartData,
        xField: 'type',
        yField: 'value',
        // seriesField: 'dvcMdl',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        yAxis: {
            label: {
                formatter: (text) => numberFormat(text),
            },
        },
        color: '#a8ddb5',
        label: {
            position: 'middle',
            content: (item) => numberFormat((item.value).toString()),
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
        yAxis: {
            label: {
                formatter: (text) => numberFormat(text),
            },
        },
        color: '#66acde',
        label: {
            position: 'middle',
            content: (item) => numberFormat((item.value).toString()),
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
                <h2>{props.title}</h2>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <h3>플러그 온도</h3>
                            <Box {...tpBoxConfig} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <h3>초당 최소 전압</h3>
                            <Box {...viBoxConfig} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <h3>초당 최대 전압</h3>
                            <Box {...vxBoxConfig} />
                        </Card>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <h3>통신 신호 강도</h3>
                            <Column {...rsColumnConfig} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <h3>위치 정확도</h3>
                            <Column {...acColumnConfig} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <h3>Zero trip ratio & 비정상 gps ratio </h3>
                            <Column {...ratioColumnConfig} />
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>

    )

};
export default DeviceStatisticChart;
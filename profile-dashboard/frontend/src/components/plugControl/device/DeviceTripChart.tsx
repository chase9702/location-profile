import React, {useEffect, useState} from 'react';
import {boxPlotField, deviceTop100Data, deviceTripData} from "@src/components/plugControl/types";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Card from "antd/lib/card";
import Box from "@ant-design/plots/lib/components/box";
import Column from "@ant-design/plots/lib/components/column";
import {get} from "@src/api";
import {encodeQueryData, numberFormat} from "@src/common/utils";
import {NotifyError} from "@src/components/common/Notification";
import {useSelector} from "react-redux";
import {StoreState} from "@src/reducers";
import Button from "antd/lib/button";
import {downloadFileFromFrontendData} from "@src/common/file-download";


interface Props {
    title: string,
}

const DeviceTripChart = (props: Props): React.ReactElement => {

    const selectedDeviceGb = useSelector((state: StoreState) => state.device.selectedDeviceGb)
    const selectedDeviceId = useSelector((state: StoreState) => state.device.selectedDeviceId)
    const [excelDownLoading, setExcelDownLoading] = useState(false);
    const [tripLoading, setTripLoading] = useState(false);
    const [tripDataList, setTripDataList] = useState([]);

    const [deviceTpBoxChartData, setDeviceTpBoxChartData] = useState([]);
    const [deviceViBoxChartData, setDeviceViBoxChartData] = useState([]);
    const [deviceVxBoxChartData, setDeviceVxBoxChartData] = useState([]);
    const [plugMinValue, setPlugMinValue] = useState(0);
    const [viMinValue, setViMinValue] = useState(0);
    const [vxMinValue, setVxMinValue] = useState(0);

    const [deviceRsColumnChartData, setDeviceRsColumnChartData] = useState([]);
    const [deviceAcColumnChartData, setDeviceAcColumnChartData] = useState([]);


    useEffect(() => {
        if (selectedDeviceId !== '') {
            getDailyTripDeviceInfo()
        }
    }, [selectedDeviceId]);

    useEffect(() => {

        if (tripDataList.length !== 0) {
            makeBoxChartData(tripDataList)
            makeColumnChartData(tripDataList)
        }

    }, [tripDataList])

    const getDailyTripDeviceInfo = () => {

        setTripLoading(true);
        const requestData = {
            device_id: selectedDeviceId,
            device_gb: selectedDeviceGb,
        };

        get<any>(`/api/plug/device/top/trip?` + encodeQueryData(requestData))
            .then(jsonData => {
                setTripDataList(jsonData)
                setTripLoading(false);
            })
            .catch((error) => {
                NotifyError(error)
            })
    }

    const makeBoxChartData = (dataList: any[]) => {

        let tpDataList = [];
        let viDataList = [];
        let vxDataList = [];
        let tripNumber = 0;
        dataList.forEach(data => {
            if (data.dvc_id === selectedDeviceId) {
                tripNumber += 1;
                tpDataList.push({
                    xFieldName: 'trip_' + tripNumber,
                    tripId: data.trip_id,
                    max: parseFloat(data.tp_max.toFixed(4)),
                    'mean+1std': parseFloat((data.tp_mean + data.tp_std).toFixed(4)),
                    mean: parseFloat(data.tp_mean.toFixed(4)),
                    'mean-1std': parseFloat((data.tp_mean - data.tp_std).toFixed(4)),
                    min: parseFloat(data.tp_min.toFixed(4))
                })
                viDataList.push({
                    xFieldName: 'trip_' + tripNumber,
                    tripId: data.trip_id,
                    max: parseFloat(data.vi_max.toFixed(4)),
                    'mean+1std': parseFloat((data.vi_mean + data.vi_std).toFixed(4)),
                    mean: parseFloat(data.vi_mean.toFixed(4)),
                    'mean-1std': parseFloat((data.vi_mean - data.vi_std).toFixed(4)),
                    min: parseFloat(data.vi_min.toFixed(4))
                })
                vxDataList.push({
                    xFieldName: 'trip_' + tripNumber,
                    tripId: data.trip_id,
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
        xField: 'xFieldName',
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
        tooltip: {
            customContent: (title, items) => {
                if (items.length > 0) {
                    const excludedKeys = ["$$range$$", "xFieldName"];
                    return (
                        <div>
                            <h3 style={{marginTop: 16}}>{title}</h3>
                            <ul style={{paddingLeft: 0}}>
                                {Object.entries(items[0].data)
                                    .filter(([key]) => !excludedKeys.includes(key)) // 특정 키 제외
                                    .map(([key, value]) => (
                                        <li
                                            key={key}
                                            className="g2-tooltip-list-item"
                                            // data-index={index}
                                            style={{marginBottom: 4, display: 'flex', alignItems: 'center'}}
                                        >
                                            <span className="g2-tooltip-marker"
                                                  style={{backgroundColor: '#1890FF'}}/>
                                            <span
                                                style={{
                                                    display: 'inline-flex',
                                                    flex: 1,
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                            <span
                                                className="g2-tooltip-list-item-value"
                                            >
                                                {key}: {value}
                                            </span>
                                        </span>

                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )
                } else {
                    return (
                        <></>
                    )
                }

            },
        },
        animation: false,
    };

    const viBoxConfig = {
        data: deviceViBoxChartData,
        xField: 'xFieldName',
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
        tooltip: {
            customContent: (title, items) => {
                if (items.length > 0) {
                    const excludedKeys = ["$$range$$", "xFieldName"];
                    return (
                        <div>
                            <h3 style={{marginTop: 16}}>{title}</h3>
                            <ul style={{paddingLeft: 0}}>
                                {Object.entries(items[0].data)
                                    .filter(([key]) => !excludedKeys.includes(key)) // 특정 키 제외
                                    .map(([key, value]) => (
                                        <li
                                            key={key}
                                            className="g2-tooltip-list-item"
                                            // data-index={index}
                                            style={{marginBottom: 4, display: 'flex', alignItems: 'center'}}
                                        >
                                            <span className="g2-tooltip-marker"
                                                  style={{backgroundColor: '#cc7ae8'}}/>
                                            <span
                                                style={{
                                                    display: 'inline-flex',
                                                    flex: 1,
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                            <span
                                                className="g2-tooltip-list-item-value"
                                            >
                                                {key}: {value}
                                            </span>
                                        </span>

                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )
                } else {
                    return (
                        <></>
                    )
                }

            },
        },
    };

    const vxBoxConfig = {
        data: deviceVxBoxChartData,
        xField: 'xFieldName',
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
            minLimit: Math.floor(vxMinValue) - 1,
            label: {
                formatter: (text) => numberFormat(text),
            },
        },
        legend: {
            layout: 'horizontal',
            position: 'right'
        },
        animation: false,
        tooltip: {
            customContent: (title, items) => {
                if (items.length > 0) {
                    const excludedKeys = ["$$range$$", "xFieldName"];
                    return (
                        <div>
                            <h3 style={{marginTop: 16}}>{title}</h3>
                            <ul style={{paddingLeft: 0}}>
                                {Object.entries(items[0].data)
                                    .filter(([key]) => !excludedKeys.includes(key)) // 특정 키 제외
                                    .map(([key, value]) => (
                                        <li
                                            key={key}
                                            className="g2-tooltip-list-item"
                                            // data-index={index}
                                            style={{marginBottom: 4, display: 'flex', alignItems: 'center'}}
                                        >
                                            <span className="g2-tooltip-marker"
                                                  style={{backgroundColor: '#ffe018'}}/>
                                            <span
                                                style={{
                                                    display: 'inline-flex',
                                                    flex: 1,
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                            <span
                                                className="g2-tooltip-list-item-value"
                                            >
                                                {key}: {value}
                                            </span>
                                        </span>

                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )
                } else {
                    return (
                        <></>
                    )
                }

            },
        },
    };

    const makeColumnChartData = (dataList: any[]) => {

        let rsDataList = [];
        let acDataList = [];
        let tripNumber = 0;

        dataList.forEach(data => {
            if (data.dvc_id === selectedDeviceId) {
                tripNumber += 1;
                for (const key in data) {
                    if (key.startsWith('rs')) {
                        rsDataList.push({
                            xFieldName: 'trip_' + tripNumber,
                            tripId: data.trip_id,
                            type: key.replace("_cnt", "_비율"),
                            value: data[key]
                        });
                    }
                    if (key.startsWith('ac')) {
                        acDataList.push({
                            xFieldName: 'trip_' + tripNumber,
                            tripId: data.trip_id,
                            type: key.replace("_cnt", "_비율"),
                            value: data[key]
                        });
                    }
                }
            }
        })

        const rsResult = rsDataList.map((obj) => {
            const {tripId, value, ...rest} = obj;
            const sumValue = rsDataList.filter((item) => item.tripId === tripId)
                .reduce((acc, item) => acc + item.value, 0);
            const result = parseFloat(((value / sumValue) * 100).toFixed(2))
            return {tripId, value, ...rest, result};
        })


        const acResult = acDataList.map((obj) => {
            const {tripId, value, ...rest} = obj;
            const sumValue = acDataList.filter((item) => item.tripId === tripId)
                .reduce((acc, item) => acc + item.value, 0);
            const result = parseFloat(((value / sumValue) * 100).toFixed(2))
            return {tripId, value, ...rest, result};
        })

        console.log(acResult)

        setDeviceRsColumnChartData(rsResult)
        setDeviceAcColumnChartData(acResult)
    }


    const rsColumnConfig = {
        data: deviceRsColumnChartData,
        xField: 'xFieldName',
        yField: 'result',
        seriesField: 'type',
        isGroup: true,
        dodgePadding: 2,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        yAxis: {
            label: {
                formatter: (text) => numberFormat(text),
            },
        },
        // color: '#a8ddb5',
        label: {
            position: 'middle',
            content: (item) => numberFormat((item.result).toString()) + '%',
            style: {
                fill: '#000',
                fontSize: 11,
            },
        },
        tooltip: {
            customContent: (title, items) => {
                return (
                    <>
                        <h3 style={{marginTop: 16}}>{(title)}</h3>
                        <ul style={{paddingLeft: 0}}>
                            {items.length > 0 ?

                                <li
                                    key={0}
                                    className="g2-tooltip-list-item"
                                    data-index={0}
                                    style={{marginBottom: 4, display: 'flex', alignItems: 'center'}}
                                >
                                    <span className="g2-tooltip-marker" style={{backgroundColor: items[0].color}}/>
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            flex: 1,
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                    <span className="g2-tooltip-list-item-value">{'tripId:'+items[0].data.tripId}</span>
                                    </span>
                                </li>
                                : <></>
                            }
                            {items?.map((item, index) => {
                                const {name, value, color} = item;
                                return (
                                    <li
                                        key={index}
                                        className="g2-tooltip-list-item"
                                        data-index={index}
                                        style={{marginBottom: 4, display: 'flex', alignItems: 'center'}}
                                    >
                                        <span className="g2-tooltip-marker" style={{backgroundColor: color}}/>
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                flex: 1,
                                                justifyContent: 'space-between',
                                            }}
                                        >
                      <span className="g2-tooltip-list-item-value">{name + ': ' + numberFormat(value)}</span>
                    </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                );

            },
        },
    };
    const acColumnConfig = {
        data: deviceAcColumnChartData,
        xField: 'xFieldName',
        yField: 'result',
        seriesField: 'type',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        slider: {
            start: 0.0,
            end: 1,
        },
        tooltip: {
            customContent: (title, items) => {
                return (
                    <>
                        <h3 style={{marginTop: 16}}>{(title)}</h3>
                        <ul style={{paddingLeft: 0}}>
                            {items.length > 0 ?

                                <li
                                    key={0}
                                    className="g2-tooltip-list-item"
                                    data-index={0}
                                    style={{marginBottom: 4, display: 'flex', alignItems: 'center'}}
                                >
                                    <span className="g2-tooltip-marker" style={{backgroundColor: items[0].color}}/>
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            flex: 1,
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                    <span className="g2-tooltip-list-item-value">{'tripId:'+items[0].data.tripId}</span>
                                    </span>
                                </li>
                                : <></>
                            }
                            {items?.map((item, index) => {
                                const {name, value, color} = item;
                                return (
                                    <li
                                        key={index}
                                        className="g2-tooltip-list-item"
                                        data-index={index}
                                        style={{marginBottom: 4, display: 'flex', alignItems: 'center'}}
                                    >
                                        <span className="g2-tooltip-marker" style={{backgroundColor: color}}/>
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                flex: 1,
                                                justifyContent: 'space-between',
                                            }}
                                        >
                      <span className="g2-tooltip-list-item-value">{name + ': ' + numberFormat(value)}</span>
                    </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                );

            },
        },
    };

    const handleClickExcelDownload = async () => {
        setExcelDownLoading(true);

        const values = tripDataList.map((data) => {
            const tmpList = [];
            for (const [key, value] of Object.entries(data)) {
                tmpList.push(value);
            }
            return tmpList;
        });

        try {
            await downloadFileFromFrontendData(`/api/file/location/data`, {
                chartName: `TRIP_${selectedDeviceId}_Top100`,
                columns: deviceTripData,
                values: values
            });
        } catch (e) {
            NotifyError(e);
        }

        setExcelDownLoading(false);
    }

    return (
        <div>
            <Card>
                <h2>{props.title}</h2>
                <Button
                    type={'primary'}
                    disabled={excelDownLoading}
                    onClick={handleClickExcelDownload}
                    style={{float: "right"}}
                >
                    엑셀다운로드
                </Button>
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
                    <Col span={24}>
                        <Card>
                            <h3>통신 신호 강도</h3>
                            <Column {...rsColumnConfig} />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card style={{overflowX: 'auto'}}>
                            <h3>위치 정확도</h3>
                            <Column {...acColumnConfig} />
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>

    )

};
export default DeviceTripChart;
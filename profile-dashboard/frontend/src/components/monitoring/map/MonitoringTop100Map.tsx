import React, {useEffect, useState} from "react";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import {Button, Col, Row, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "@src/reducers";
import {
    AiMetaData,
    ExtendedMapMetaData,
    ExtendedPublicMetaData,
    MapAIHexData,
    MapBBIHexData,
    MapPublicHexData,
    PublicMetaData,
    TestHexData
} from "@src/components/monitoring/map/data-types";
import {store} from "@src/index";
import {addDataToMap, layerConfigChange, removeDataset, updateMap, wrapTo} from "@kepler.gl/actions";
import {processCsvData} from "@kepler.gl/processors";
import type {ButtonType} from "antd/es/button/buttonHelpers";
import {encodeQueryData} from "@src/common/utils";
import {get} from "@src/api";
import {NotifyError} from "@src/components/common/Notification";
import MonitoringMetaTable from "@src/components/monitoring/map/MonitoringMetaTable";


interface Props {

}

interface Data {
    [key: string]: any;
}


const MonitoringTop100Map = (props: Props): React.ReactElement => {

    const dispatch = useDispatch();

    const selectedTop100 = useSelector((state: StoreState) => state.monitoring.selectedData)
    const mapIndex = useSelector((state: StoreState) => state.map.mapIndex)
    const selectedLayer = useSelector((state: StoreState) => state.map.layer)
    const mapData = useSelector((state: StoreState) => state.keplerGl.topMap);

    const bbiDataId = 'bbiDataId';
    const aiDataId = 'aiDataId';
    const carrotDataId = 'carrotDataId';
    const publicDataId = 'publicDataId';
    const wrapToMap = wrapTo('topMap')

    const [bbiButtonType, setBbiButtonType] = useState<ButtonType>('primary');
    const [accButtonType, setAccButtonType] = useState<ButtonType>('primary');
    const [publicButtonType, setPublicButtonType] = useState<ButtonType>('primary');
    const [carrotButtonType, setCarrotButtonType] = useState<ButtonType>('default');

    const [bbiLayerVisibility, setBbiLayerVisibility] = useState(true);
    const [accLayerVisibility, setAccLayerVisibility] = useState(true);
    const [carrotLayerVisibility, setCarrotLayerVisibility] = useState(false);
    const [publicLayerVisibility, setPublicLayerVisibility] = useState(false);

    const [bbiHexDataList, setBbiHexDataList] = useState<MapBBIHexData[]>([]);
    const [csvFormattedBBIData, setCSVFormattedBBIData] = useState<string>('');
    const [aiHexDataList, setAiHexDataList] = useState<MapAIHexData[]>([]);
    const [csvFormattedAIData, setCsvFormattedAIData] = useState<string>('');
    const [publicHexDataList, setPublicHexDataList] = useState<MapPublicHexData[]>([]);
    const [csvFormattedPublicData, setCSVFormattedPublicData] = useState<string>('');
    const [carrotHexDataList, setCarrotHexDataList] = useState<MapAIHexData[]>([]);

    const [bbiMetaList, setBBIBbiMetaList] = useState<ExtendedMapMetaData[]>([]);
    const [publicMetaList, setPublicMetaList] = useState<ExtendedPublicMetaData[]>([]);
    const [aiMetaList, setAiMetaList] = useState<AiMetaData[]>([]);

    const [testHexDataList, setTestHexDataList] = useState<TestHexData[]>([]);


    useEffect(() => {
        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }));
    }, []);

    const findLayer = () => {
        const layersConfig = [
            {dataId: bbiDataId},
            {dataId: aiDataId},
            {dataId: publicDataId},
            {dataId: carrotDataId},
        ];

        return layersConfig.find(({dataId}) => {
            const layer = mapData.visState.layers.find(layer => layer.config.dataId === dataId);
            return layer !== undefined;
        });
    }


    const dataIdToListMap = {
        [bbiDataId]: bbiHexDataList,
        [aiDataId]: aiHexDataList,
        [publicDataId]: publicHexDataList,
        [carrotDataId]: carrotHexDataList
    };

    const findHexValue = (layer, listIndex) => {
        const hexList = dataIdToListMap[layer?.dataId];
        return hexList ? hexList[listIndex].hex : null;
    };

    const findHexInList = (list, hexValue) => {
        return list.find(item => item.hex === hexValue);
    };

    const transformMapMetaDataList = (data: any[], type: string): any[] => {
        return data.map(item => ({
            ...item,
            type: type
        }));
    };

    const makeBBIMetaDataList = (bbiHexItem: MapBBIHexData) => {
        let metaList: ExtendedMapMetaData[] = []
        if (bbiHexDataList.length > 0) {
            metaList.push(...transformMapMetaDataList(bbiHexItem.sac_meta, "SAC"))
            metaList.push(...transformMapMetaDataList(bbiHexItem.sst_meta, "SST"))
            metaList.push(...transformMapMetaDataList(bbiHexItem.ssp_meta, "SSP"))
            metaList.push(...transformMapMetaDataList(bbiHexItem.sdc_meta, "SDC"))
        }
        setBBIBbiMetaList(metaList)
    }

    const makeAIMetaDataList = (aiHexItem: MapAIHexData) => {
//메타 만들기
    }

    const makePublicMetaDataList = (publicHexItem: MapPublicHexData) => {

        let metaList: ExtendedPublicMetaData[] = []
        const cntData: PublicMetaData = {
            crossing_center_line: publicHexItem.crossing_center_line_cnt,
            etc: publicHexItem.etc_cnt,
            il_u_turn: publicHexItem.il_u_turn_cnt,
            intersection: publicHexItem.intersection_cnt,
            lane: publicHexItem.lane_cnt,
            light: publicHexItem.light_cnt,
            obstruct_right: publicHexItem.obstruct_right_cnt,
            pedestrian: publicHexItem.pedestrian_cnt,
            safe_distance: publicHexItem.safe_distance_cnt,
            safe_driving: publicHexItem.safe_driving_cnt,
        };

        // Create the PublicMetaData for _ratio fields
        const ratioData: PublicMetaData = {
            crossing_center_line: publicHexItem.crossing_center_line_ratio,
            etc: publicHexItem.etc_ratio,
            il_u_turn: publicHexItem.il_u_turn_ratio,
            intersection: publicHexItem.intersection_ratio,
            lane: publicHexItem.lane_ratio,
            light: publicHexItem.light_ratio,
            obstruct_right: publicHexItem.obstruct_right_ratio,
            pedestrian: publicHexItem.pedestrian_ratio,
            safe_distance: publicHexItem.safe_distance_ratio,
            safe_driving: publicHexItem.safe_driving_ratio,
        };

        // Create the ExtendedPublicMetaData objects
        const extendedCntData: ExtendedPublicMetaData = {
            ...cntData,
            type: 'CNT'
        };

        const extendedRatioData: ExtendedPublicMetaData = {
            ...ratioData,
            type: 'RATIO'
        };
        
        metaList.push(extendedCntData)
        metaList.push(extendedRatioData)

        setPublicMetaList(metaList)
    }

    const makeCarrotMetaDataList = (carrotHexItem: MapAIHexData) => {
//메타 만들기
    }
    useEffect(() => {
        if (mapData && selectedLayer) {
            let listIndex = mapIndex === -1 ? 0 : mapIndex;
            const layer = findLayer();
            let hexValue = findHexValue(layer, listIndex);


            const bbiHexItem = findHexInList(bbiHexDataList, hexValue);
            const aiHexItem = findHexInList(aiHexDataList, hexValue);
            const publicHexItem = findHexInList(publicHexDataList, hexValue);
            const carrotHexItem = findHexInList(carrotHexDataList, hexValue);

            makeBBIMetaDataList(bbiHexItem);
            makeAIMetaDataList(aiHexItem);
            makePublicMetaDataList(publicHexItem);
            makeCarrotMetaDataList(carrotHexItem);

        }

    }, [mapIndex, selectedLayer])

    useEffect(() => {

        if (selectedTop100 !== null) {
            handleSearchBBIMapData()
            // handleSearchAIMapData()
            handleSearchPublicMapData()
        }
    }, [selectedTop100])

    useEffect(() => {
        if (csvFormattedBBIData.length !== 0) {
            store.dispatch(removeDataset(bbiDataId));
            store.dispatch(wrapToMap(addDataToMap({
                datasets: {
                    info: {
                        label: 'BBI',
                        id: bbiDataId
                    },
                    data: processCsvData(csvFormattedBBIData)
                }
            })));
        }
        if (csvFormattedPublicData.length !== 0) {
            store.dispatch(removeDataset(publicDataId));
            store.dispatch(wrapToMap(addDataToMap({
                datasets: {
                    info: {
                        label: 'Public',
                        id: publicDataId
                    },
                    data: processCsvData(csvFormattedPublicData)
                }
            })));

        }
        if (csvFormattedAIData.length !== 0) {
            store.dispatch(removeDataset(aiDataId));
        }


    }, [csvFormattedBBIData, csvFormattedPublicData, csvFormattedAIData]);

    const bbiH3FormatData = (data: Data[]): string => {
        if (data.length === 0) {
            return '';
        }
        return data.map((item) => {
            return `${item.sst},${item.sac},${item.ssp},${item.sdc},${item.total_bbi},"${item.hex}"`;
        }).join('\n');
    };

    const publicH3FormatData = (data: Data[]): string => {
        if (data.length === 0) {
            return '';
        }
        return data.map((item) => {
            return `${item.serious_cnt},${item.slight_cnt},${item.total_cnt},"${item.hex}"`;
        }).join('\n');
    };

    const aiH3FormatData = (data: Data[]): string => {
        if (data.length === 0) {
            return '';
        }
        return data.map((item) => {
            return `${item.sst},${item.sac},${item.ssp},${item.sdc},${item.total_bbi},"${item.hex}"`;
        }).join('\n');
    };


    const mapQuery = () => {
        return encodeQueryData({
            addr_cd: selectedTop100.addr_cd,
            hour: selectedTop100.hour,
            part_dt: selectedTop100.part_dt
        })
    }

    const handleSearchBBIMapData = () => {
        get<MapBBIHexData[]>(`/api/monitoring/map/bbi?${mapQuery()}`)
            .then((jsonData) => {
                console.log(jsonData);
                const csvData = "SST, SAC, SSP, SDC, TOTAL_BBI, HEX  \n" + bbiH3FormatData(jsonData)
                setCSVFormattedBBIData(csvData)
                setBbiHexDataList(jsonData)
            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {

            });

    }

    const handleSearchAIMapData = () => {
        get<MapAIHexData[]>(`/api/monitoring/map/acc?${mapQuery()}`)
            .then((jsonData) => {
                console.log(jsonData);
                setAiHexDataList(jsonData)
                const csvData = "SST, SAC, SSP, SDC , TOTAL_BBI, HEX  \n" + aiH3FormatData(jsonData)


            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
                store.dispatch(wrapToMap(addDataToMap({
                    datasets: {
                        info: {
                            label: 'AI',
                            id: aiDataId
                        },
                        data: processCsvData(aiDataId)
                    }
                })));

                //carrot 사고는 마지막에 조회 하도록
                // handleSearchCarrotMapData()
            });
    }

    const handleSearchPublicMapData = () => {
        get<MapPublicHexData[]>(`/api/monitoring/map/public?${mapQuery()}`)
            .then((jsonData) => {
                console.log(jsonData);
                setPublicHexDataList(jsonData)
                const csvData = "SERIOUS_CNT, SLIGHT_CNT, TOTAL_CNT, HEX  \n" + publicH3FormatData(jsonData)
                setCSVFormattedPublicData(csvData)

            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
            });
    }

    const handleSearchCarrotMapData = () => {
        get<[]>(`/api/monitoring/map/carrot?${mapQuery()}`)
            .then((jsonData) => {
                console.log(jsonData);

            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {


            });
    }

    const clickButton = (event: React.MouseEvent<HTMLElement>, buttonName: string) => {
        switch (buttonName) {
            case "bbi":
                setBbiButtonType(prevType => (prevType === 'primary' ? 'default' : 'primary'))
                if (mapData) {
                    const layer = mapData.visState.layers.find(layer => layer.config.dataId === bbiDataId);
                    if (layer) {
                        const visibility = !layer.config.isVisible;
                        dispatch(layerConfigChange(layer, {isVisible: visibility}));
                        setBbiLayerVisibility(visibility);
                    }
                }
                break;
            case "acc":
                setAccButtonType(prevType => (prevType === 'primary' ? 'default' : 'primary'))
                if (mapData) {
                    const layer = mapData.visState.layers.find(layer => layer.config.dataId === aiDataId);
                    if (layer) {
                        const visibility = !layer.config.isVisible;
                        dispatch(layerConfigChange(layer, {isVisible: visibility}));
                        setAccLayerVisibility(visibility);
                    }
                }
                break;
            case "carrot":
                setCarrotButtonType(prevType => (prevType === 'primary' ? 'default' : 'primary'))
                if (carrotButtonType === 'default') {
                    // store.dispatch(wrapToMap(addDataToMap({
                    //     datasets: {
                    //         info: {
                    //             label: 'carrot 사고',
                    //             id: carrotDataId
                    //         },
                    //         data: processCsvData(publicDataList),
                    //
                    //     },
                    // })));
                }
                if (mapData) {
                    const layer = mapData.visState.layers.find(layer => layer.config.dataId === carrotDataId);
                    if (layer) {
                        const visibility = !layer.config.isVisible;
                        dispatch(layerConfigChange(layer, {isVisible: visibility}));
                        setCarrotLayerVisibility(visibility);
                    }
                }
                break;
            case "public":
                setCarrotButtonType(prevType => (prevType === 'primary' ? 'default' : 'primary'))
                if (mapData) {
                    const layer = mapData.visState.layers.find(layer => layer.config.dataId === publicDataId);
                    if (layer) {
                        const visibility = !layer.config.isVisible;
                        dispatch(layerConfigChange(layer, {isVisible: visibility}));
                        setPublicLayerVisibility(visibility);
                    }
                }
                break;
            default:
                break;
        }
    }
    const buttonDisabled = (): boolean => {
        return selectedTop100 === null;
    }


    return (
        <div>
            <Row gutter={16} style={{marginBottom: 8}}>
                <Col span={6}>
                    <Space>
                        <Button
                            onClick={(e) => clickButton(e, 'bbi')}
                            type={bbiButtonType}
                            disabled={buttonDisabled()}
                        >
                            BBI
                        </Button>
                        <Button
                            onClick={(e) => clickButton(e, 'acc')}
                            type={accButtonType}
                            disabled={buttonDisabled()}
                        >
                            사고인지
                        </Button>
                        <Button
                            onClick={(e) => clickButton(e, 'public')}
                            type={publicButtonType}
                            disabled={buttonDisabled()}
                        >
                            공공사고
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <CustomKeplerMap id={"topMap"} heightRatio={30}/>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Space>
                        <MonitoringMetaTable
                            bbiMetaList={bbiMetaList}
                            publicMetaList={publicMetaList}
                            aiMetaList={aiMetaList}
                        />
                    </Space>
                </Col>
            </Row>

        </div>
    )
};

export default MonitoringTop100Map;

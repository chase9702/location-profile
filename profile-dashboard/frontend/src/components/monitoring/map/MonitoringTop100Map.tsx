import React, { useEffect, useState } from 'react';
import CustomKeplerMap from '@src/components/common/CustomKeplerMap';
import { Button, Col, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@src/reducers';
import {
  AiMetaData,
  BBIMetaData,
  ExtendedPublicMetaData,
  MapAIHexData,
  MapBBIHexData,
  MapPublicHexData,
  PublicMetaData,
} from '@src/components/monitoring/map/data-types';
import { store } from '@src/index';
import {
  addDataToMap,
  layerConfigChange,
  removeDataset,
  updateMap,
  wrapTo,
} from '@kepler.gl/actions';
import { processCsvData } from '@kepler.gl/processors';
import type { ButtonType } from 'antd/es/button/buttonHelpers';
import { encodeQueryData } from '@src/common/utils';
import { get } from '@src/api';
import { NotifyError } from '@src/components/common/Notification';
import MonitoringMetaTable from '@src/components/monitoring/map/MonitoringMetaTable';

interface Data {
  [key: string]: any;
}

const MonitoringTop100Map = (): React.ReactElement => {
  const dispatch = useDispatch();

  const selectedTop100 = useSelector(
    (state: StoreState) => state.monitoring.selectedData
  );
  const mapIndex = useSelector((state: StoreState) => state.map.mapIndex);
  const selectedLayer = useSelector((state: StoreState) => state.map.layer);
  const mapData = useSelector((state: StoreState) => state.keplerGl.topMap);

  const bbiDataId = 'bbiDataId';
  const aiDataId = 'aiDataId';
  const carrotDataId = 'carrotDataId';
  const publicDataId = 'publicDataId';
  const wrapToMap = wrapTo('topMap');

  const [bbiButtonType, setBbiButtonType] = useState<ButtonType>('primary');
  const [aiButtonType, setAiButtonType] = useState<ButtonType>('default');
  const [publicButtonType, setPublicButtonType] =
    useState<ButtonType>('default');
  const [bbiLayerVisibility, setBbiLayerVisibility] = useState(true);
  const [accLayerVisibility, setAccLayerVisibility] = useState(true);
  const [publicLayerVisibility, setPublicLayerVisibility] = useState(false);

  const [bbiHexDataList, setBbiHexDataList] = useState<MapBBIHexData[]>([]);
  const [bbiHexDataLoading, setBbiHexDataLoading] = useState(false);
  const [csvFormattedBBIData, setCSVFormattedBBIData] = useState<string>('');
  const [clickedAiButton, setClickedAiButton] = useState<boolean>(false);
  const [aiHexDataList, setAiHexDataList] = useState<MapAIHexData[]>([]);
  const [aiHexDataLoading, setAiHexDataLoading] = useState(false);
  const [csvFormattedAIData, setCsvFormattedAIData] = useState<string>('');
  const [clickedPublicButton, setClickedPublicButton] =
    useState<boolean>(false);
  const [publicHexDataList, setPublicHexDataList] = useState<
    MapPublicHexData[]
  >([]);
  const [publicHexDataLoading, setPublicHexDataLoading] = useState(false);
  const [csvFormattedPublicData, setCSVFormattedPublicData] =
    useState<string>('');
  const [carrotHexDataList, setCarrotHexDataList] = useState<MapAIHexData[]>(
    []
  );

  const buttonLoading =
    bbiHexDataLoading || aiHexDataLoading || publicHexDataLoading;

  const [bbiMetaList, setBBIBbiMetaList] = useState<BBIMetaData[]>([]);
  const [publicMetaList, setPublicMetaList] = useState<
    ExtendedPublicMetaData[]
  >([]);
  const [aiMetaList, setAiMetaList] = useState<AiMetaData[]>([]);
  const [metaTableLoading, setMetaTableLoading] = useState(false);

  useEffect(() => {
    store.dispatch(
      updateMap({
        latitude: 37.5658,
        longitude: 126.9889, // 캐롯 좌표
      })
    );
  }, []);

  const initialState = () => {
    store.dispatch(
      updateMap({
        latitude: 37.5658,
        longitude: 126.9889, // 캐롯 좌표
      })
    );
    setAiButtonType('default');
    setBbiButtonType('primary');
    setPublicButtonType('default');
    store.dispatch(removeDataset(bbiDataId));
    store.dispatch(removeDataset(aiDataId));
    store.dispatch(removeDataset(publicDataId));
    setCSVFormattedPublicData('');
    setCsvFormattedAIData('');
    setCSVFormattedBBIData('');
    setBBIBbiMetaList([]);
    setPublicMetaList([]);
    setAiMetaList([]);
    setClickedAiButton(false);
    setClickedPublicButton(false);
  };

  useEffect(() => {
    initialState();
    if (selectedTop100 !== null) {
      handleSearchBBIMapData();
    }
  }, [selectedTop100]);

  useEffect(() => {
    if (aiButtonType === 'primary' && clickedAiButton === false) {
      handleSearchAIMapData();
    }
    if (publicButtonType === 'primary' && clickedPublicButton === false) {
      handleSearchPublicMapData();
    }
  }, [aiButtonType, publicButtonType]);

  const findLayer = () => {
    const layer = mapData.visState.layers.find(
      (layer) => layer.id === selectedLayer.id
    );
    return layer.config.dataId;
  };

  const dataIdToListMap = {
    [bbiDataId]: bbiHexDataList,
    [aiDataId]: aiHexDataList,
    [publicDataId]: publicHexDataList,
    [carrotDataId]: carrotHexDataList,
  };

  const findHexValue = (layer, listIndex) => {
    const hexList = dataIdToListMap[layer];
    return hexList ? hexList[listIndex].hex : null;
  };

  const findHexInList = (list, hexValue) => {
    return list.find((item) => item.hex === hexValue);
  };

  const makeBBIMetaDataList = (bbiHexItem: MapBBIHexData) => {
    if (bbiHexItem === null || undefined === bbiHexItem) {
      setBBIBbiMetaList([]);
      return;
    }

    setMetaTableLoading(true);

    get<BBIMetaData[]>(
      `/api/monitoring/map/meta/bbi?${encodeQueryData({
        hex: bbiHexItem.hex,
        hour: selectedTop100.hour,
        start_date: selectedTop100.start_date,
        end_date: selectedTop100.end_date,
      })}`
    )
      .then((jsonData) => {
        setBBIBbiMetaList(jsonData);
      })
      .catch((error) => {
        NotifyError(error);
      })
      .finally(() => {
        setMetaTableLoading(false);
      });
  };

  const makeAIMetaDataList = (aiHexItem: MapAIHexData) => {
    //메타 만들기

    if (aiHexItem === null || undefined === aiHexItem) {
      setAiMetaList([]);
      return;
    }
    return [];
  };

  const makePublicMetaDataList = (publicHexItem: MapPublicHexData) => {
    const metaList: ExtendedPublicMetaData[] = [];
    if (publicHexItem === null || undefined === publicHexItem) {
      setPublicMetaList(metaList);
      return;
    }
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
      type: 'CNT',
    };

    const extendedRatioData: ExtendedPublicMetaData = {
      ...ratioData,
      type: 'RATIO',
    };

    metaList.push(extendedCntData);
    metaList.push(extendedRatioData);

    setPublicMetaList(metaList);
  };

  const makeCarrotMetaDataList = (carrotHexItem: MapAIHexData) => {
    //메타 만들기
  };
  useEffect(() => {
    if (mapData && Object.keys(selectedLayer).length !== 0) {
      const listIndex = mapIndex === -1 ? 0 : mapIndex;
      const layer = findLayer();

      const hexValue = findHexValue(layer, listIndex);

      const lists = [
        { list: bbiHexDataList, item: null },
        { list: aiHexDataList, item: null },
        { list: publicHexDataList, item: null },
        { list: carrotHexDataList, item: null },
      ];

      lists.forEach((obj, index) => {
        if (obj.list && obj.list.length > 0) {
          lists[index].item = findHexInList(obj.list, hexValue);
        }
      });

      const [bbiHexItem, aiHexItem, publicHexItem, carrotHexItem] = lists.map(
        (obj) => obj.item
      );

      makeBBIMetaDataList(bbiHexItem);
      makeAIMetaDataList(aiHexItem);
      makePublicMetaDataList(publicHexItem);
      makeCarrotMetaDataList(carrotHexItem);
    }
  }, [mapIndex, selectedLayer]);

  useEffect(() => {
    if (csvFormattedBBIData.length !== 0) {
      store.dispatch(removeDataset(bbiDataId));
      store.dispatch(
        wrapToMap(
          addDataToMap({
            datasets: {
              info: {
                label: 'BBI',
                id: bbiDataId,
              },
              data: processCsvData(csvFormattedBBIData),
            },
          })
        )
      );
    }
  }, [csvFormattedBBIData]);
  useEffect(() => {
    if (csvFormattedPublicData.length !== 0) {
      store.dispatch(removeDataset(publicDataId));
      store.dispatch(
        wrapToMap(
          addDataToMap({
            datasets: {
              info: {
                label: 'Public',
                id: publicDataId,
              },
              data: processCsvData(csvFormattedPublicData),
            },
          })
        )
      );
    }
  }, [csvFormattedPublicData]);
  useEffect(() => {
    if (csvFormattedAIData.length !== 0) {
      store.dispatch(removeDataset(aiDataId));
      store.dispatch(
        wrapToMap(
          addDataToMap({
            datasets: {
              info: {
                label: 'Ai',
                id: aiDataId,
              },
              data: processCsvData(csvFormattedAIData),
            },
          })
        )
      );
    }
  }, [csvFormattedAIData]);
  // 공통 형식화 함수
  const formatH3Data = (
    header: string,
    data: Data[],
    mapper: (item: Data) => string
  ): string => {
    if (data.length === 0) {
      return '';
    }
    return header + '\n' + data.map(mapper).join('\n');
  };

  // 각 데이터 형식에 맞는 매핑 함수
  const bbiH3Mapper = (item: Data): string => {
    return `${item.sst},${item.sac},${item.ssp},${item.sdc},${item.total_bbi},"${item.hex}"`;
  };

  const publicH3Mapper = (item: Data): string => {
    return `${item.serious_cnt},${item.slight_cnt},${item.total_cnt},"${item.hex}"`;
  };

  const aiH3Mapper = (item: Data): string => {
    return `${item.dtct_dt},${item.lv_1_cnt},${item.lv_2_cnt},"${item.hex}"`;
  };

  // 각 데이터 형식에 대한 형식화 함수
  const bbiH3FormatData = (data: Data[]): string => {
    return formatH3Data(
      'SST, SAC, SSP, SDC, TOTAL_BBI, HEX',
      data,
      bbiH3Mapper
    );
  };

  const publicH3FormatData = (data: Data[]): string => {
    return formatH3Data(
      'SERIOUS_CNT, SLIGHT_CNT, TOTAL_CNT, HEX',
      data,
      publicH3Mapper
    );
  };

  const aiH3FormatData = (data: Data[]): string => {
    return formatH3Data('DTCT_DT, LV_1_CNT, LV_2_CNT, HEX', data, aiH3Mapper);
  };

  const mapQuery = () => {
    return encodeQueryData({
      addr_cd: selectedTop100.addr_cd,
      hour: selectedTop100.hour,
      start_date: selectedTop100.start_date,
      end_date: selectedTop100.end_date,
    });
  };

  const handleSearchBBIMapData = () => {
    setBbiHexDataLoading(true);
    get<MapBBIHexData[]>(`/api/monitoring/map/bbi?${mapQuery()}`)
      .then((jsonData) => {
        const csvData = bbiH3FormatData(jsonData);
        setCSVFormattedBBIData(csvData);
        setBbiHexDataList(jsonData);
      })
      .catch((error) => {
        NotifyError(error);
      })
      .finally(() => {
        setBbiHexDataLoading(false);
      });
  };

  const handleSearchAIMapData = () => {
    setAiHexDataLoading(true);
    get<MapAIHexData[]>(`/api/monitoring/map/ai?${mapQuery()}`)
      .then((jsonData) => {
        setAiHexDataList(jsonData);
        const csvData = aiH3FormatData(jsonData);
        setCsvFormattedAIData(csvData);
      })
      .catch((error) => {
        NotifyError(error);
      })
      .finally(() => {
        setClickedAiButton(true);
        setAiHexDataLoading(false);
      });
  };

  const handleSearchPublicMapData = () => {
    setPublicHexDataLoading(true);
    get<MapPublicHexData[]>(`/api/monitoring/map/public?${mapQuery()}`)
      .then((jsonData) => {
        setPublicHexDataList(jsonData);
        const csvData = publicH3FormatData(jsonData);
        setCSVFormattedPublicData(csvData);
      })
      .catch((error) => {
        NotifyError(error);
      })
      .finally(() => {
        setClickedPublicButton(true);
        setPublicHexDataLoading(false);
      });
  };

  const clickButton = (
    event: React.MouseEvent<HTMLElement>,
    buttonName: string
  ) => {
    switch (buttonName) {
      case 'bbi':
        setBbiButtonType((prevType) =>
          prevType === 'primary' ? 'default' : 'primary'
        );
        if (mapData) {
          const layer = mapData.visState.layers.find(
            (layer) => layer.config.dataId === bbiDataId
          );
          if (layer) {
            const visibility = !layer.config.isVisible;
            dispatch(layerConfigChange(layer, { isVisible: visibility }));
            setBbiLayerVisibility(visibility);
          }
        }
        break;
      case 'ai':
        setAiButtonType((prevType) =>
          prevType === 'primary' ? 'default' : 'primary'
        );
        if (mapData) {
          const layer = mapData.visState.layers.find(
            (layer) => layer.config.dataId === aiDataId
          );
          if (layer) {
            const visibility = !layer.config.isVisible;
            dispatch(layerConfigChange(layer, { isVisible: visibility }));
            setAccLayerVisibility(visibility);
          }
        }
        break;
      case 'public':
        setPublicButtonType((prevType) =>
          prevType === 'primary' ? 'default' : 'primary'
        );
        if (mapData) {
          const layer = mapData.visState.layers.find(
            (layer) => layer.config.dataId === publicDataId
          );
          if (layer) {
            const visibility = !layer.config.isVisible;
            dispatch(layerConfigChange(layer, { isVisible: visibility }));
            setPublicLayerVisibility(visibility);
          }
        }
        break;
      default:
        break;
    }
  };
  const buttonDisabled = (): boolean => {
    return selectedTop100 === null;
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 8 }}>
        <Col span={6}>
          <Space>
            <Button
              onClick={(e) => clickButton(e, 'bbi')}
              type={bbiButtonType}
              loading={buttonLoading}
              disabled={buttonDisabled()}
            >
              BBI
            </Button>
            <Button
              onClick={(e) => clickButton(e, 'ai')}
              type={aiButtonType}
              loading={buttonLoading}
              disabled={buttonDisabled()}
            >
              사고인지
            </Button>
            <Button
              onClick={(e) => clickButton(e, 'public')}
              type={publicButtonType}
              loading={buttonLoading}
              disabled={buttonDisabled()}
            >
              공공사고
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <CustomKeplerMap id={'topMap'} heightRatio={65} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Space>
            <MonitoringMetaTable
              loading={metaTableLoading}
              bbiMetaList={bbiMetaList}
              publicMetaList={publicMetaList}
              aiMetaList={aiMetaList}
            />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default MonitoringTop100Map;

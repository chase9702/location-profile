import React, {useEffect, useRef, useState} from "react";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import {Button, Col, Input, InputRef, Row, Space, TableColumnType} from "antd";
import Table from "antd/lib/table";
import {FilterDropdownProps} from "antd/lib/table/interface";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {TableProps} from "antd/es/table";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "@src/reducers";
import {MapMetaTableDataType} from "@src/components/monitoring/map/data-types";
import {store} from "@src/index";
import {addDataToMap, updateMap, wrapTo, layerConfigChange} from "@kepler.gl/actions";
import {processCsvData} from "@kepler.gl/processors";
import type {ButtonType} from "antd/es/button/buttonHelpers";


type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];


interface Props {

}

type DataIndex = keyof MapMetaTableDataType;

const MonitoringTop100Map = (props: Props): React.ReactElement => {

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter');
    const [bbiButtonType, setBbiButtonType] = useState<ButtonType>('primary');
    const [accButtonType, setAccButtonType] = useState<ButtonType>('primary');
    const [carrotButtonType, setCarrotButtonType] = useState<ButtonType>('default');
    const mapIndex = useSelector((state: StoreState) => state.map.mapIndex)
    const selectedTop100 = useSelector((state: StoreState) => state.monitoring.selectedData)

    const wrapToMap = wrapTo('topMap')
    const [layerVisibility, setLayerVisibility] = useState(true);
    const mapData = useSelector((state: StoreState) => state.keplerGl.topMap);


    const testData = `,address,h3_index
0,부산광역시 연제구 거제동,8a30c161cae7fff
1,부산광역시 연제구 거제동,8a30c161da67fff
2,부산광역시 연제구 거제동,8a30c161db57fff
3,부산광역시 연제구 거제동,8a30c1618b77fff
4,부산광역시 연제구 거제동,8a30c161d51ffff
5,부산광역시 연제구 거제동,8a30c161c257fff
6,부산광역시 연제구 거제동,8a30c161d89ffff
7,부산광역시 연제구 거제동,8a30c1618ac7fff
8,부산광역시 연제구 거제동,8a30c161dd37fff
9,부산광역시 연제구 거제동,8a30c1618b47fff
10,부산광역시 연제구 거제동,8a30c1618a5ffff
11,부산광역시 연제구 거제동,8a30c1619daffff
12,부산광역시 연제구 거제동,8a30c161d46ffff
13,부산광역시 연제구 거제동,8a30c161d21ffff
14,부산광역시 연제구 거제동,8a30c161c32ffff`


    useEffect(() => {

        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }))

        store.dispatch(wrapToMap(addDataToMap({
            datasets: {
                info: {
                    label: 'Seoul City CSV',
                    id: 'test_data_csv'
                },
                data: processCsvData(testData)
            }
        })));
        console.log(">>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<")

        console.log(mapData)
    }, []);

    useEffect(() => {
        console.log("---------------:" + mapData)
        console.log(mapData)
    }, [mapData]);

    useEffect(() => {
        console.log("mapIndex:::" + mapIndex)
        /*
        여기서 meta 데이터 조회
         */

    }, [mapIndex])

    useEffect(() => {
        if (selectedTop100 !== null) {
            console.log("선택된 데이터 :::" + selectedTop100.addr)
        }
        /*
        여기서 지도 데이터 조회
         */

    }, [selectedTop100])


    const clickButton = (event: React.MouseEvent<HTMLElement>, buttonName: string) => {
        switch (buttonName) {
            case "bbi":
                setBbiButtonType(prevType => (prevType === 'primary' ? 'default' : 'primary'))
                if (mapData) {
                    const layer = mapData.visState.layers.find(layer => layer.config.dataId === 'test_data_csv');
                    if (layer) {
                        const visibility = !layer.config.isVisible;
                        dispatch(layerConfigChange(layer, { isVisible: visibility }));
                        setLayerVisibility(visibility);
                    }
                }
                break;
            case "acc":
                setAccButtonType(prevType => (prevType === 'primary' ? 'default' : 'primary'))
                break;
            case "carrot":
                setCarrotButtonType(prevType => (prevType === 'primary' ? 'default' : 'primary'))
                break;
            default:
                break;
        }
    }
    const buttonDisabled = (buttonName: string): boolean => {
        return buttonName === "acc" ? carrotButtonType === "primary" : accButtonType === "primary";
    }


    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void,
                         confirm: FilterDropdownProps['confirm'],
    ) => {
        clearFilters();
        setSearchText('');
        confirm();
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<MapMetaTableDataType> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? '#1677ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableProps<MapMetaTableDataType>['columns'] = [
        {
            title: '주소',
            dataIndex: 'addr',
            key: 'addr',
            align: 'center',
            ...getColumnSearchProps('addr')
        },
    ];

    const data: MapMetaTableDataType[] = [];

    for (let i = 0; i < 100; i++) {
        data.push({
            key: `${i}`,
            addr: `London, Park Laneasdasdasdas no. ${i}`,
        });
    }

    return (
        <div>

            <Row gutter={16} style={{marginBottom: 8}}>
                <Col span={6}>
                    <Space>
                        <Button
                            onClick={(e) => clickButton(e, 'bbi')}
                            type={bbiButtonType}
                        >
                            BBI
                        </Button>
                        <Button
                            onClick={(e) => clickButton(e, 'acc')}
                            type={accButtonType}
                            disabled={buttonDisabled('acc')}
                        >
                            사고인지
                        </Button>
                        <Button
                            onClick={(e) => clickButton(e, 'carrot')}
                            type={carrotButtonType}
                            disabled={buttonDisabled('carrot')}
                        >
                            Carrot 사고
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={16}>
                    <CustomKeplerMap id={"topMap"} heightRatio={100}/>
                </Col>
                <Col span={8}>
                    <Space>
                        <Table
                            columns={columns}
                            dataSource={data}
                            scroll={{y: 550}}
                            pagination={{position: [bottom]}}
                        />
                    </Space>
                </Col>
            </Row>

        </div>
    )
};

export default MonitoringTop100Map;

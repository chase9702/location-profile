import React, {useRef, useState} from "react";
import Table from "antd/lib/table";
import {AiMetaData, ExtendedMapMetaData, ExtendedPublicMetaData} from "@src/components/monitoring/map/data-types";
import {TableProps} from "antd/es/table";
import {Button, Input, InputRef, Space, TableColumnType} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {FilterDropdownProps} from "antd/lib/table/interface";
import TabPane from "antd/es/tabs/TabPane";
import Tabs from "antd/lib/tabs";

type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];

interface Props {
    bbiMetaList: ExtendedMapMetaData[],
    publicMetaList: ExtendedPublicMetaData[],
    aiMetaList: AiMetaData[],
}

// type DataIndex = keyof ExtendedMapMetaData | keyof AiMetaData | keyof PublicMetaData;
type DataIndex<T> = keyof T;

const MonitoringMetaTable = (props: Props): React.ReactElement => {

    const searchInput = useRef<InputRef>(null);
    const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState<DataIndex<ExtendedPublicMetaData> | DataIndex<AiMetaData> | string>('');


    const handleSearch = <T, >(
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex<T>,
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

    const getColumnSearchProps = <T, >(dataIndex: DataIndex<T>): TableColumnType<T> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${String(dataIndex)}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch<T>(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch<T>(selectedKeys as string[], confirm, dataIndex)}
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

    const bbiColumns: TableProps<ExtendedMapMetaData>['columns'] = [
        {
            title: '분류',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            ...getColumnSearchProps<ExtendedMapMetaData>('type')
        },
        {
            title: '트립ID',
            dataIndex: 'trip_id',
            key: 'trip_id',
            align: 'center',
            ...getColumnSearchProps<ExtendedMapMetaData>('trip_id')
        },
        {
            title: 'CT',
            dataIndex: 'ct',
            key: 'ct',
            align: 'center',
            ...getColumnSearchProps<ExtendedMapMetaData>('ct')
        },
        {
            title: 'SP',
            dataIndex: 'sp',
            key: 'sp',
            align: 'center',
            ...getColumnSearchProps<ExtendedMapMetaData>('sp')
        },
        {
            title: 'FS',
            dataIndex: 'fs',
            key: 'fs',
            align: 'center',
            ...getColumnSearchProps<ExtendedMapMetaData>('fs')
        },
        {
            title: 'DURT',
            dataIndex: 'durt',
            key: 'durt',
            align: 'center',
            ...getColumnSearchProps<ExtendedMapMetaData>('durt')
        },
        {
            title: 'ACCEL',
            dataIndex: 'accel',
            key: 'accel',
            align: 'center',
            ...getColumnSearchProps<ExtendedMapMetaData>('accel')
        },
        {
            title: 'AC',
            dataIndex: 'ac',
            key: 'ac',
            align: 'center',
            ...getColumnSearchProps<ExtendedMapMetaData>('ac')
        },
        {
            title: 'SA',
            dataIndex: 'sa',
            key: 'sa',
            align: 'center',
            ...getColumnSearchProps<ExtendedMapMetaData>('sa')
        }
    ];

    const publicColumns: TableProps<ExtendedPublicMetaData>['columns'] = [
        {
            title: '분류',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('type')
        },
        {
            title: 'crossing_center_line',
            dataIndex: 'crossing_center_line',
            key: 'crossing_center_line',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('crossing_center_line')
        },
        {
            title: 'etc',
            dataIndex: 'etc',
            key: 'etc',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('etc')
        },
        {
            title: 'il_u_turn',
            dataIndex: 'il_u_turn',
            key: 'il_u_turn',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('il_u_turn')
        },
        {
            title: 'intersection',
            dataIndex: 'intersection',
            key: 'intersection',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('intersection')
        },
        {
            title: 'lane',
            dataIndex: 'lane',
            key: 'lane',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('lane')
        },
        {
            title: 'light',
            dataIndex: 'light',
            key: 'light',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('light')
        },
        {
            title: 'obstruct_right',
            dataIndex: 'obstruct_right',
            key: 'obstruct_right',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('obstruct_right')
        },
        {
            title: 'pedestrian',
            dataIndex: 'pedestrian',
            key: 'pedestrian',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('pedestrian')
        },
        {
            title: 'safe_distance',
            dataIndex: 'safe_distance',
            key: 'safe_distance',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('safe_distance')
        },
        {
            title: 'safe_driving',
            dataIndex: 'safe_driving',
            key: 'safe_driving',
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('safe_driving')
        },
    ];

    const aiColumns: TableProps<AiMetaData>['columns'] = [
        {
            title: '트립ID',
            dataIndex: 'trip_id',
            key: 'trip_id',
            align: 'center',
            ...getColumnSearchProps<AiMetaData>('trip_id')
        },
        {
            title: 'CT',
            dataIndex: 'ct',
            key: 'ct',
            align: 'center',
            ...getColumnSearchProps<AiMetaData>('ct')
        },
        {
            title: 'SP',
            dataIndex: 'sp',
            key: 'sp',
            align: 'center',
            ...getColumnSearchProps<AiMetaData>('sp')
        },
    ];

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="BBI META" key="1">
                    <Table
                        columns={bbiColumns}
                        dataSource={props.bbiMetaList}
                        scroll={{y: 190}}
                        pagination={{position: [bottom]}}
                    />
                </TabPane>
                <TabPane tab="공공사고 META" key="2">
                    <Table
                        columns={publicColumns}
                        dataSource={props.publicMetaList}
                        scroll={{y: 190}}
                        pagination={{position: [bottom]}}
                    />
                </TabPane>
                <TabPane tab="사고인지 META" key="3">
                    <Table
                        columns={aiColumns}
                        dataSource={props.aiMetaList}
                        scroll={{y: 190}}
                        pagination={{position: [bottom]}}
                    />
                </TabPane>
            </Tabs>

        </div>
    )
};

export default MonitoringMetaTable;


import React, {useEffect, useRef, useState} from "react";
import Table from "antd/lib/table";
import {
    AiMetaData,
    BBIMetaData,
    ExtendedPublicMetaData
} from "@src/components/monitoring/map/data-types";
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
    bbiMetaList: BBIMetaData[],
    publicMetaList: ExtendedPublicMetaData[],
    aiMetaList: AiMetaData[],
}

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

    useEffect(() => {
        console.log("0-0-0-0-0-0-0-00-0-")
        console.log(props.bbiMetaList)
    }, [props.bbiMetaList]);

    const bbiColumns: TableProps<BBIMetaData>['columns'] = [
        {
            title: '분류',
            dataIndex: 'behavior',
            key: 'behavior',
            align: 'center',
            ...getColumnSearchProps<BBIMetaData>('behavior')
        },
        {
            title: '트립ID',
            dataIndex: 'trip_id',
            key: 'trip_id',
            align: 'center',
            width: 100,
            ellipsis: true,
            ...getColumnSearchProps<BBIMetaData>('trip_id')
        },
        {
            title: 'CT',
            dataIndex: 'ct',
            key: 'ct',
            align: 'center',
            ...getColumnSearchProps<BBIMetaData>('ct')
        },
        {
            title: 'SP',
            dataIndex: 'sp',
            key: 'sp',
            align: 'center',
            ...getColumnSearchProps<BBIMetaData>('sp')
        },
        {
            title: 'FS',
            dataIndex: 'fs',
            key: 'fs',
            align: 'center',
            ...getColumnSearchProps<BBIMetaData>('fs')
        },
        {
            title: 'DURT',
            dataIndex: 'durt',
            key: 'durt',
            align: 'center',
            ...getColumnSearchProps<BBIMetaData>('durt')
        },
        {
            title: 'ACCEL',
            dataIndex: 'accel',
            key: 'accel',
            align: 'center',
            ...getColumnSearchProps<BBIMetaData>('accel')
        },
        {
            title: 'AC',
            dataIndex: 'ac',
            key: 'ac',
            align: 'center',
            ...getColumnSearchProps<BBIMetaData>('ac')
        },
        {
            title: 'SA',
            dataIndex: 'sa',
            key: 'sa',
            align: 'center',
            ...getColumnSearchProps<BBIMetaData>('sa')
        }
    ];

    const publicColumns: TableProps<ExtendedPublicMetaData>['columns'] = [
        {
            title: '분류',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            fixed: 'left',
            width: 80,
            ...getColumnSearchProps<ExtendedPublicMetaData>('type')
        },
        {
            title: '중앙선침범',
            dataIndex: 'crossing_center_line',
            key: 'crossing_center_line',
            align: 'center',
            width: 100,
            ellipsis: true,
            ...getColumnSearchProps<ExtendedPublicMetaData>('crossing_center_line')
        },
        {
            title: '기타',
            dataIndex: 'etc',
            key: 'etc',
            width: 80,
            align: 'center',
            ...getColumnSearchProps<ExtendedPublicMetaData>('etc')
        },
        {
            title: '불법유턴',
            dataIndex: 'il_u_turn',
            key: 'il_u_turn',
            align: 'center',
            width: 100,
            ellipsis: true,
            ...getColumnSearchProps<ExtendedPublicMetaData>('il_u_turn')
        },
        {
            title: '교차로운행방법위반',
            dataIndex: 'intersection',
            key: 'intersection',
            align: 'center',
            width: 100,
            ellipsis: true,
            ...getColumnSearchProps<ExtendedPublicMetaData>('intersection')
        },
        {
            title: '차로위반',
            dataIndex: 'lane',
            key: 'lane',
            align: 'center',
            width: 100,
            ...getColumnSearchProps<ExtendedPublicMetaData>('lane')
        },
        {
            title: '신호위반',
            dataIndex: 'light',
            key: 'light',
            align: 'center',
            width: 100,
            ellipsis: true,
            ...getColumnSearchProps<ExtendedPublicMetaData>('light')
        },
        {
            title: '직진우회전진행방해',
            dataIndex: 'obstruct_right',
            key: 'obstruct_right',
            align: 'center',
            width: 100,
            ellipsis: true,
            ...getColumnSearchProps<ExtendedPublicMetaData>('obstruct_right')
        },
        {
            title: '보행자보호의무위반',
            dataIndex: 'pedestrian',
            key: 'pedestrian',
            align: 'center',
            width: 100,
            ellipsis: true,
            ...getColumnSearchProps<ExtendedPublicMetaData>('pedestrian')
        },
        {
            title: '안전거리미확보',
            dataIndex: 'safe_distance',
            key: 'safe_distance',
            align: 'center',
            width: 100,
            ellipsis: true,
            ...getColumnSearchProps<ExtendedPublicMetaData>('safe_distance')
        },
        {
            title: '안전운전불이행',
            dataIndex: 'safe_driving',
            key: 'safe_driving',
            align: 'center',
            width: 100,
            ellipsis: true,
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
                        scroll={{y: 200}}
                        pagination={{position: [bottom]}}
                    />
                </TabPane>
                <TabPane tab="공공사고 META" key="2">
                    <Table
                        columns={publicColumns}
                        dataSource={props.publicMetaList}
                        scroll={{y: 200}}
                        pagination={{position: [bottom]}}
                    />
                </TabPane>
                <TabPane tab="사고인지 META" key="3">
                    <Table
                        columns={aiColumns}
                        dataSource={props.aiMetaList}
                        scroll={{y: 200}}
                        pagination={{position: [bottom]}}
                    />
                </TabPane>
            </Tabs>

        </div>
    )
};

export default MonitoringMetaTable;


import React, {useRef, useState} from "react";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import {Button, Col, Input, InputRef, Row, Space, TableColumnType} from "antd";
import Table from "antd/lib/table";
import {FilterDropdownProps} from "antd/lib/table/interface";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {TableProps} from "antd/es/table";

type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];


interface Props {

}


interface TableDataType {
    key: string;
    addr: string;
}
type DataIndex = keyof TableDataType;

const MonitoringTop100Map = (props: Props): React.ReactElement => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter');



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

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<TableDataType> => ({
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

    const columns: TableProps<TableDataType>['columns'] = [
        {
            title: '주소',
            dataIndex: 'addr',
            key: 'addr',
            align: 'center',
            ...getColumnSearchProps('addr')
        },
    ];

    const data: TableDataType[] = [];

    for (let i = 0; i < 100; i++) {
        data.push({
            key: `${i}`,
            addr: `London, Park Laneasdasdasdas no. ${i}`,
        });
    }

    return (
        <div>

            <Row gutter={16} style={{ marginBottom: 8 }}>
                <Col span={6}>
                    <Space>
                        <Button>BBI</Button>
                        <Button>사고인지</Button>
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

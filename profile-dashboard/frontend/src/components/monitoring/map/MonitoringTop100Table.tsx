import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, DatePickerProps, Input, InputRef, Row, Space, TableColumnType} from "antd";
import TimePicker from "antd/lib/time-picker";
import DatePicker from "antd/lib/date-picker";
import dayjs, {Dayjs} from "dayjs";
import {TableProps} from "antd/es/table";
import Table from "antd/lib/table";
import {FilterDropdownProps} from "antd/lib/table/interface";
import {DownOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import {Top100DropMenuItems, Top100TableDataType} from "@src/components/monitoring/map/data-types";
import {useDispatch} from "react-redux";
import {setSelectedTableData} from "@src/actions/MonitoringAction";
import {now} from "moment";
import {format} from "url";
import {RangePickerProps} from "antd/es/date-picker";
import {get} from "@src/api";
import {NotifyError} from "@src/components/common/Notification";
import Dropdown from "antd/lib/dropdown/dropdown";
import {MenuProps} from "antd/lib";
import {encodeQueryData} from "@src/common/utils";
import './map.css';

type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];

interface Props {

}


type DataIndex = keyof Top100TableDataType;

const MonitoringTop100Table = (props: Props): React.ReactElement => {

    const dispatch = useDispatch();
    const searchInput = useRef<InputRef>(null);

    const [selectedTime, setSelectedTime] = useState(dayjs(now()));
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(now()).subtract(1, 'day'));
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter');
    const [selectedFilter, setSelectedFilter] = useState('total_bbi')
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [top100DataList, setTop100DataList] = useState<Top100TableDataType[]>([]);

    const [selectedRowIndex, setSelectedRowIndex] = useState(null);

    useEffect(() => {
        handleClickSearch()
    }, []);

    const makeQueryString = () => {
        const queryParams: Record<string, string | null> = {
            hour: selectedTime.format("HH"),
            part_dt: selectedDate.format("YYYYMMDD"),
        };
        return encodeQueryData(queryParams)
    }

    const handleClickSearch = () => {
        setSearchLoading(true);
        get<Top100TableDataType[]>(`/api/monitoring/map/top100/${selectedFilter}?` + makeQueryString())
            .then((jsonData) => {
                setTop100DataList(jsonData)

            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
                setSearchLoading(false);
            });
    }

    const handleDatePickerChange: DatePickerProps['onChange'] = (date: Dayjs, dateString) => {
        setSelectedDate(date);
    };

    const handleTimePickerChange = (date: Dayjs, dateString: string | string[]) => {
        setSelectedTime(dayjs(date));
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current >= dayjs().startOf('day');
    };

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

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Top100TableDataType> => ({
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


    const getLabelByKey = (key: string): string | undefined => {
        const item = Top100DropMenuItems.find(item => item.key === key);
        return item ? item.label : undefined;
    };
    const columns: TableProps<Top100TableDataType>['columns'] = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            align: 'center',
        },
        {
            title: '주소',
            dataIndex: 'addr',
            key: 'addr',
            align: 'center',
            ...getColumnSearchProps('addr')
        },
        {
            title: getLabelByKey(selectedFilter),
            dataIndex: 'behavior_value',
            key: 'behavior_value',
            align: 'center',
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        setSelectedFilter(e.key)
    };

    const menuProps = {
        items: Top100DropMenuItems,
        onClick: handleMenuClick,
    };

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Space>
                        <TimePicker
                            value={selectedTime}
                            onChange={handleTimePickerChange}
                            format="HH"
                            showMinute={false}
                            showSecond={false}
                            hourStep={1}
                            needConfirm={false}
                        />
                        <DatePicker
                            value={selectedDate}
                            onChange={handleDatePickerChange}
                            disabledDate={disabledDate}
                        />
                        <Dropdown menu={menuProps}>
                            <Button>
                                <Space>
                                    {getLabelByKey(selectedFilter)}
                                    <DownOutlined/>
                                </Space>
                            </Button>
                        </Dropdown>
                        <Button
                            onClick={handleClickSearch}
                            loading={searchLoading}
                            type={"primary"}
                        >
                            조회
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Space>
                        <Table
                            columns={columns}
                            dataSource={top100DataList}
                            scroll={{y: 550}}
                            pagination={{position: [bottom]}}
                            rowClassName={(record, index) => {
                                return index === selectedRowIndex ? 'selected-row' : '';
                            }}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
                                        setSelectedRowIndex(rowIndex);
                                        dispatch(setSelectedTableData(record))
                                    }, // click row

                                };
                            }}
                        />
                    </Space>
                </Col>
            </Row>

        </div>
    )
};

export default MonitoringTop100Table;

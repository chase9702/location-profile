import React, {useRef, useState} from "react";
import {Button, Card, Col, DatePickerProps, Input, InputRef, Row, Space, TableColumnType} from "antd";
import TimePicker from "antd/lib/time-picker";
import DatePicker from "antd/lib/date-picker";
import dayjs, {Dayjs} from "dayjs";
import {TableProps} from "antd/es/table";
import Table from "antd/lib/table";
import {FilterDropdownProps} from "antd/lib/table/interface";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import {Top100TableDataType} from "@src/components/monitoring/map/data-types";
import {useDispatch} from "react-redux";
import {setSelectedTableData} from "@src/actions/MonitoringAction";
import {now} from "moment";
import {format} from "url";
import {RangePickerProps} from "antd/es/date-picker";
import {get} from "@src/api";
import {NotifyError} from "@src/components/common/Notification";

type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];

interface Props {

}



type DataIndex = keyof Top100TableDataType;

const MonitoringTop100Table = (props: Props): React.ReactElement => {

    const dispatch = useDispatch();
    const searchInput = useRef<InputRef>(null);

    const [selectedTime, setSelectedTime] = useState(dayjs(now()));
    const [selectedDate , setSelectedDate] = useState<Dayjs | null>(dayjs(now()).subtract(1,'day'));
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter');

    const [searchLoading , setSearchLoading] = useState<boolean>(false);


    const handleClickSearch = () =>{
        console.log('조회')
        setSearchLoading(true);

        get<[]>(`/api//destination/personal/?${queryString}`)
            .then((jsonData) => {
                console.log(jsonData);

            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
                setSearchLoading(false);;
            });

    }

    const handleDatePickerChange: DatePickerProps['onChange'] = (date:Dayjs, dateString) => {
        setSelectedDate(date);
    };

    const handleTimePickerChange = (date: Dayjs, dateString: string | string[]) => {
        setSelectedTime(dayjs(date));
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        console.log(dayjs().endOf('day'))
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

    const columns: TableProps<Top100TableDataType>['columns'] = [
        {
            title: '주소',
            dataIndex: 'addr',
            key: 'addr',
            align: 'center',
            ...getColumnSearchProps('addr')
        },
    ];

    const data: Top100TableDataType[] = [];

    for (let i = 0; i < 100; i++) {
        data.push({
            key: `${i}`,
            addr: `London, Park Laneasdasdasdas no. ${i}`,
        });
    }


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
                        <Button
                            onClick={handleClickSearch}
                            loading={searchLoading}
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
                            dataSource={data}
                            scroll={{y: 550}}
                            pagination={{position: [bottom]}}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
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

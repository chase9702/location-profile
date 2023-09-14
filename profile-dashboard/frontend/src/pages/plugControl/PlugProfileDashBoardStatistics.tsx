import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row, Select, Table, Space, Tag, Calendar, DatePicker} from "antd";
import {DeleteOutlined, SaveOutlined, SearchOutlined} from '@ant-design/icons';
import PageTitle from "@src/components/common/PageTitle";
import {get, post} from "@src/api";
import {Column, DualAxes, Treemap} from "@ant-design/plots";
import type {ColumnsType,} from 'antd/es/table';
import type {RangePickerProps} from 'antd/es/date-picker';
import TestPlugTable from "@src/components/plugControl/TestPlugTable";



interface State {
}

interface Props {

}

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const PlugProfileDashBoard = (props: Props): React.ReactElement => {

    const [hiveData, sethiveData] = useState([])
    const [ZeroGPSData, setZeroGPSData] = useState([]);
    const [Trip02Data, settrip02Data] = useState([]);
    const [CarNameData, setCarNameData] = useState([]);

    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedModel, setSelectedModel] = useState('');


    useEffect(() => {
        asynctrip02Fetch();
        asyncZeroGPSFetch();
        asynccarnameFetch();
        setSelectedCompany('제조사 선택');
        setSelectedModel('모델명 선택');
    }, []);


    const handleSearchClick = () => {
        const requestData = {
            selectedStartDate,
            selectedEndDate,
            selectedCompany,
            selectedModel,
        };

        // "조회" 버튼 클릭 시 백엔드로 선택한 옵션을 보냄
        post<[]>("/api/plug/statistic/click-test", {requestData})
            .then((response) => {
                console.log('백엔드 응답:', response);
            })
            .catch((error) => {
                console.error('에러 발생:', error);
            });
    };

    const handleCompanyChange = (value) => {
        setSelectedCompany(value);
    };

    const handleModelChange = (value) => {
        setSelectedModel(value);
    };


    const asyncHiveFetch = () => {
        get<[]>("/api/plug/statistic/device-info")
            .then((jsonData) => {
                sethiveData(jsonData)
            })
    };

    const asyncZeroGPSFetch = () => {
        get<[]>("/api/plug/statistic/zero-gps-trip-info")
            .then((jsonData) => {
                setZeroGPSData(jsonData)
            })
    };

    const asynctrip02Fetch = () => {
        get<[]>("/api/plug/statistic/interpolation-trip-info")
            .then((jsonData) => {
                settrip02Data(jsonData)
            })
    };

    const asynccarnameFetch = () => {
        get<[]>("/api/plug/statistic/car-product-name-info")
            .then((jsonData) => {
                console.log(jsonData)
                setCarNameData(jsonData)
            })
    };

    const trip02config = {
        data: Trip02Data,
        xField: 'part_dt',
        yField: 'trip_rt',
        seriesField: 'dvc_gb',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        label: {
            position: 'middle',
            content: (item) => `${item.trip_rt}`, // 각 데이터의 값을 라벨로 표시
            style: {
                fill: '#000', // 라벨 색상 설정
                fontSize: 12,
            },
        },
    };

    const zeroGPSconfig = {
        data: ZeroGPSData,
        xField: 'part_dt',
        yField: 'trip_rt',
        seriesField: 'dvc_gb',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        label: {
            position: 'middle',
            content: (item) => `${item.trip_rt}`, // 각 데이터의 값을 라벨로 표시
            style: {
                fill: '#000', // 라벨 색상 설정
                fontSize: 12,
            },
        },
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, {tags}) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const tabledata: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    const collinedata = [
        {
            time: '2019-03',
            value: 350,
            count: 800,
        },
        {
            time: '2019-04',
            value: 900,
            count: 600,
        },
        {
            time: '2019-05',
            value: 300,
            count: 400,
        },
        {
            time: '2019-06',
            value: 450,
            count: 380,
        },
        {
            time: '2019-07',
            value: 470,
            count: 220,
        },
    ];

    const treemapdata = {
        name: 'root',
        children: CarNameData,
    };

    const collineconfig = {
        data: [collinedata, collinedata],
        xField: 'time',
        yField: ['value', 'count'],
        geometryOptions: [
            {
                geometry: 'column',
                pattern: {
                    type: 'line',
                },
            },
            {
                geometry: 'line',
                lineStyle: {
                    lineWidth: 2,
                },
            },
        ],
    };

    const treemapconfig = {
        data: treemapdata,
        colorField: 'cr_prd_cmpcd_nm',
        value: 'trip_rt'
    };

    const testdata = {
        name: 'root',
        children: [
            {
                name: '分类 1',
                trip_rt: 560,
            },
            {
                name: '分类 2',
                trip_rt: 500,
            },
            {
                name: '分类 3',
                trip_rt: 150,
            },
            {
                name: '分类 4',
                trip_rt: 140,
            },
            {
                name: '分类 5',
                trip_rt: 115,
            },
            {
                name: '分类 6',
                value: 95,
            },
            {
                name: '分类 7',
                trip_rt: 90,
            },
            {
                name: '分类 8',
                trip_rt: 75,
            },
            {
                name: '分类 9',
                trip_rt: 98,
            },
        ],
    };
    const testconfig = {
        data: testdata,
        colorField: 'name',
    };

    const {RangePicker} = DatePicker;

    const onChange = (
        value: RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        const startDate = dateString[0]
        const endDate = dateString[1]
        setSelectedStartDate(startDate)
        setSelectedEndDate(endDate)
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const onOk = (value: RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };


    const renderSaveComponent = () => {
        return (
            <div>
                <Row gutter={0}>

                    <Col span={8}>
                        <Space direction="vertical" size={12}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                onChange={onChange}
                                onOk={onOk}
                            />
                        </Space>
                    </Col>

                    <Col span={8}>
                        <Space>
                            <Select
                                showSearch
                                placeholder="제조사 선택"
                                optionFilterProp="children"
                                onChange={handleCompanyChange}
                                value={selectedCompany}
                                style={{width: '100%', float: 'left'}}
                                options={[
                                    {value: 'LUX', label: 'LUX'},
                                    {value: 'TLK', label: 'TLK'},
                                    {value: 'AMT', label: 'AMT'},
                                    {value: 'UNK', label: 'UNK'},
                                    {value: 'disabled', label: 'Disabled', disabled: true},
                                ]}
                            >
                            </Select>

                            <Select
                                showSearch
                                placeholder="모델명 선택"
                                defaultValue=""
                                optionFilterProp="children"
                                onChange={handleModelChange}
                                value={selectedModel}
                                style={{width: '100%', float: 'left'}}
                                options={[
                                    {value: 'LUX1', label: 'LUX1'},
                                    {value: 'LUX2', label: 'LUX2'},
                                    {value: 'UNK1', label: 'UNK1'},
                                    {value: 'AMT1', label: 'AMT1'},
                                    {value: 'disabled', label: 'Disabled', disabled: true},
                                ]}
                            >
                            </Select>

                            <Select
                                showSearch
                                placeholder="차종 선택"
                                optionFilterProp="children"
                                // onChange={selectFunnelName}
                                style={{width: '100%', float: 'left'}}
                                options={[
                                    {value: '현대', label: '현대'},
                                    {value: '기아', label: '기아'},
                                    {value: '테슬라', label: '테슬라'},
                                    {value: '등등', label: '등등'},
                                    {value: 'disabled', label: 'Disabled', disabled: true},
                                ]}
                            >
                            </Select>
                        </Space>
                    </Col>

                    <Col span={8}>
                        <Space>
                            <Select
                                showSearch
                                placeholder="증권번호 선택"
                                optionFilterProp="children"
                                // onChange={selectFunnelName}
                                style={{width: '100%', float: 'left'}}
                                options={[
                                    {value: '11111', label: '11111'},
                                    {value: '22222', label: '22222'},
                                    {value: '33333', label: '33333'},
                                    {value: '44444', label: '44444'},
                                    {value: 'disabled', label: 'Disabled', disabled: true},
                                ]}
                            >
                            </Select>

                            <Select
                                showSearch
                                placeholder="디바이스 선택"
                                optionFilterProp="children"
                                style={{width: '100%', float: 'left'}}
                                options={[
                                    {value: 'LUX1_12345', label: 'LUX1_12345'},
                                    {value: 'LUX2_12345', label: 'LUX2_12345'},
                                    {value: 'UNK1_12345', label: 'UNK1_12345'},
                                    {value: 'AMT1_12345', label: 'AMT1_12345'},
                                    {value: 'disabled', label: 'Disabled', disabled: true},
                                ]}
                            >

                            </Select>
                        </Space>
                    </Col>

                </Row>

                <Row gutter={0} style={{float: 'right'}}>
                    <Col span={8}>
                        <Button icon={<SaveOutlined/>}>
                            저장
                        </Button>
                    </Col>

                    <Col span={8}>
                        <Button icon={<SearchOutlined/>} onClick={handleSearchClick}>
                            조회
                        </Button>
                    </Col>

                    <Col span={8}>
                        <Button icon={<DeleteOutlined/>}
                        >
                            초기화
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <div>
            <PageTitle
                title="Plug Profile DashBoard"
                description={[
                    'Plug 관제 정보를 확인 할 수 있습니다.',
                ]}

            />

            <Card>
                {renderSaveComponent()}
            </Card>

            <Card style={{padding: '10px'}}>
                <TestPlugTable />
            </Card>


            <Row gutter={0}>
                <Col span={12}>
                    <Card style={{padding: '10px'}}>
                        <div>
                            X축 : 날짜, Y축 : 보간비율, 범례 : 제조사
                            <Column {...trip02config} />
                        </div>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card style={{padding: '10px'}}>
                        <div>
                            X축 : 날짜, Y축 : Zero GPS비율, 범례 : 제조사
                            <Column {...zeroGPSconfig} />
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={0}>
                <Col span={12}>
                    <Card style={{padding: '10px'}}>
                        <div>
                            X축 : 제작년월, Y축 : 보간비율, line : 디바이스 수
                            <DualAxes {...collineconfig} />
                        </div>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card style={{padding: '10px'}}>
                        <div>
                            차량 회사별 제로 비율
                            <Treemap {...testconfig} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default PlugProfileDashBoard;



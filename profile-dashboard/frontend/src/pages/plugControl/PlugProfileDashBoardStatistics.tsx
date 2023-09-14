import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row, Select, Table, Space, Tag, Calendar, DatePicker, Tabs} from "antd";
import {DeleteOutlined, SaveOutlined, SearchOutlined} from '@ant-design/icons';
import PageTitle from "@src/components/common/PageTitle";
import {get, post} from "@src/api";
import {Column, DualAxes, Treemap} from "@ant-design/plots";
import type {ColumnsType,} from 'antd/es/table';
import type {RangePickerProps} from 'antd/es/date-picker';
import PlugInterpolationDailyTable from "@src/components/plugControl/PlugInterpolationDailyTable";
import TabPane from "antd/es/tabs/TabPane";



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



    return (
        <div>
            <PageTitle
                title="Plug Profile DashBoard"
                description={[
                    'Plug 관제 정보를 확인 할 수 있습니다.',
                ]}

            />


            <Card style={{padding: '10px'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="테이블 탭" key="1">
                        <PlugInterpolationDailyTable />
                    </TabPane>
                    <TabPane tab="그래프 탭" key="2">
                        그래프
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
};

export default PlugProfileDashBoard;



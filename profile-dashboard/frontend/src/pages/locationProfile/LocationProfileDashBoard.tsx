import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row, Select} from "antd";
import {DeleteOutlined, SaveOutlined, SearchOutlined} from '@ant-design/icons';
import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";
import {Line, Liquid, Treemap} from '@ant-design/plots';
import {LegendCfg} from '@antv/g2/src/interface';
import PageTitle from "@src/components/common/PageTitle";
import {addDataToMap, updateMap} from "kepler.gl/actions";
import {store} from "@src/index";
import {processCsvData} from "kepler.gl/processors";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import {Column} from "@ant-design/plots";
import {get} from "@src/api"

interface State {
}

interface Props {

}

const LocationProfileDashBoard = (props: Props): React.ReactElement => {

    const [data, setData] = useState([]);
    const [wordData, setWordData] = useState([]);
    const [excelDownLoading, setExcelDownLoading] = useState(false);
    const [hiveData, sethiveData] = useState([])

    const testData = `no,eid,source,target,tunnel,geometry,source_lt,source_ln,target_lt,target_ln,length,reversed,eid_idx
7106,342885007,436745716,436745711,yes,"LINESTRING (126.6218273000000067 34.4071537000000021, 126.6226323000000065 34.4076621999999972)",34.4071537,126.6218273,34.4076622,126.6226323,93.011,False,342885007
7107,342885007,436745711,436745716,yes,"LINESTRING (126.6226323000000065 34.4076621999999972, 126.6218273000000067 34.4071537000000021)",34.4076622,126.6226323,34.4071537,126.6218273,93.011,True,342885007`
    useEffect(() => {
        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }))

        /*
        그냥 초기 데이터 보여주는건데.. 이게 또 없으면 그 add file이 팝업 되서..
        이 부분은 팝업 안되고 내가 만든 조회 화면이 띄워지게 한다거나
        아니면 그냥 디폴트 조회로 오늘날짜 기준 무언가를 보여준다거나 해야 할듯?
         */
        store.dispatch(addDataToMap({
            datasets: {
                info: {
                    label: 'Seoul City CSV',
                    id: 'test_data_csv'
                },
                data: processCsvData(testData)
            }
        }));

    }, []);

    useEffect(() => {
        asyncFetch();
    }, []);

    useEffect(() => {
        asyncWordFetch();
    }, []);

    useEffect(() => {
        asyncHiveFetch();
    }, []);

    const asyncHiveFetch = () => {
        get<[]>("/api/plug/device-info")
            .then((jsonData) => {
                sethiveData(jsonData)
            })
    };

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const asyncWordFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
            .then((response) => response.json())
            .then((json) => setWordData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    const config = {
        data,
        xField: 'year',
        yField: 'gdp',
        seriesField: 'name',
        yAxis: {
            label: {
                formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
            },
        },
        legend: {
            layout: 'horizontal',
            position: 'top'
        } as LegendCfg,
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };

    const treedata = {
        name: 'root',
        children: [
            {
                name: '分类 1',
                value: 560,
            },
            {
                name: '分类 2',
                value: 500,
            },
            {
                name: '分类 3',
                value: 150,
            },
            {
                name: '分类 4',
                value: 140,
            },
            {
                name: '分类 5',
                value: 115,
            },
            {
                name: '分类 6',
                value: 95,
            },
            {
                name: '分类 7',
                value: 90,
            },
            {
                name: '分类 8',
                value: 75,
            },
            {
                name: '分类 9',
                value: 98,
            },
            {
                name: '分类 10',
                value: 60,
            },
            {
                name: '分类 11',
                value: 45,
            },
            {
                name: '分类 12',
                value: 40,
            },
            {
                name: '分类 13',
                value: 40,
            },
            {
                name: '分类 14',
                value: 35,
            },
            {
                name: '分类 15',
                value: 40,
            },
            {
                name: '分类 16',
                value: 40,
            },
            {
                name: '分类 17',
                value: 40,
            },
            {
                name: '分类 18',
                value: 30,
            },
            {
                name: '分类 19',
                value: 28,
            },
            {
                name: '分类 20',
                value: 16,
            },
        ],
    };

    const treeconfig = {
        data:treedata,
        colorField: 'name',
    };

    const wordConfig = {
        data: wordData,
        wordField: 'name',
        weightField: 'value',
        colorField: 'name',
        wordStyle: {
            fontFamily: 'Verdana',
            fontSize: [8, 32] as [number, number],
            rotation: 0,
        },
        random: () => 0.5,
    };

    const liquidConfig = {
        padding: [0, 120],
        percent: 0.85,
        outline: {
            border: 4,
            distance: 5,
        },
        wave: {
            length: 128,
        },
        statistic: {
            content: {
                style: {
                    fontSize: 32,
                    fill: '#ffffff',
                    opacity: 1,
                    lineWidth: 2,
                    shadowColor: '#000',
                    shadowBlur: 10,
                },
                offsetY: 2,
            },
        },
        pattern: {
            type: 'dot',
            cfg: {
                size: 30,
            },
        },
    };

    const hiveconfig = {
        data: hiveData,
        xField: 'dvcgb',
        yField: 'cnt01',
        xAxis: {
            label: {
                autoRotate: false,
            },
        },
        slider: {
            start: 0.1,
            end: 0.2,
        },
    };

    const handleClickExcelDownload = async () => {
        setExcelDownLoading(true);
        // const columns = data.map((data) => {
        //     return data.;
        // });

        const values = data.map((data) => {
            const tmpList = [];
            for (const [key, value] of Object.entries(data)) {
                tmpList.push(value);
            }
            return tmpList;
        });

        try {
            await downloadFileFromFrontendData(`/api/file/location/data`, {
                chartName: "test_chart",
                columns: ["name", "year", "gdp"],
                values: values
            });
        } catch (e) {
            NotifyError(e);
        }

        setExcelDownLoading(false);
    };

    const renderSaveComponent = () => {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={8}>

                        <Select
                            showSearch
                            placeholder="Funnel 선택"
                            optionFilterProp="children"
                            // onChange={selectFunnelName}
                            style={{width: '100%'}}
                        >

                        </Select>

                    </Col>
                    <Col span={9}>
                        <Button icon={<SaveOutlined/>}>
                            저장
                        </Button>
                        <Button icon={<SearchOutlined/>}>
                            조회
                        </Button>

                    </Col>
                    <Col span={4}>
                        <Button style={{float: 'right'}} icon={<DeleteOutlined/>}
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
                title="Location Profile DashBoard"
                description={[
                    '특정 유저 그룹(Segment)의 결제 수준과 소비 성향을 확인 할 수 있습니다.',
                    '소비 특성 정보는 상대적인 소비 Score로 일반 유저(평균 0.5) 대비 소비 수준을 파악할 수 있습니다.',
                ]}
                extraDescription={
                    <div>
                        더 다양한 차트를 보려면&nbsp;
                        <a
                            href={'https://charts.ant.design/en/examples'}
                            target={'_blank'}
                            rel="noreferrer"
                        >
                            이곳에서
                        </a>
                        &nbsp;참고하세요.
                    </div>
                }
            />
            <CustomKeplerMap
                heightRatio={70}
                id={"locationMap"}
            />

            <Card>
                {renderSaveComponent()}
            </Card>
            <Button
                type={'primary'}
                disabled={excelDownLoading}
                onClick={handleClickExcelDownload}
            >
                download
            </Button>
            <div>
                <Line {...config} />
            </div>
            <div>
                <Treemap {...treeconfig}/>
            </div>
            <div>
                <Liquid {...liquidConfig}/>
            </div>

        </div>
    )


};

export default LocationProfileDashBoard
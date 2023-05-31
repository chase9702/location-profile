import React, {useEffect, useState} from "react";
import {Button, Card, Col, Radio, Row, Select} from "antd";
import {DeleteOutlined, SaveOutlined, SearchOutlined} from '@ant-design/icons';
import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";
import {Line, Liquid, WordCloud} from '@ant-design/plots';
import {LegendCfg} from '@antv/g2/src/interface';
import PageTitle from "@src/components/common/PageTitle";
import moment from 'moment';

interface State {
}

interface Props {

}

const LocationProfileDashBoard = (props: Props): React.ReactElement => {

    const [data, setData] = useState([]);
    const [wordData, setWordData] = useState([]);
    const [excelDownLoading, setExcelDownLoading] = useState(false);


    useEffect(() => {
        asyncFetch();
    }, []);

    useEffect(() => {
        asyncWordFetch();
    }, []);
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
                    '세그먼트를 선택하지 않으면 Active User(미인증&휴면 제외) 현황이 표시됩니다.',
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
                <WordCloud {...wordConfig}/>
            </div>
            <div>
                <Liquid {...liquidConfig}/>
            </div>

        </div>
    )


};

export default LocationProfileDashBoard
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row, Select} from "antd";
import {DeleteOutlined, SaveOutlined, SearchOutlined} from '@ant-design/icons';
import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";
import PageTitle from "@src/components/common/PageTitle";
import {Link} from "react-router-dom";
import {store} from '@src/index';
import {addDataToMap, forwardTo} from "kepler.gl/actions";
import {connect} from "react-redux";


interface State {
}

interface Props {
    keplerGlDispatch: (action: any) => void;
}

const PlugProfileDashBoard = (props: Props): React.ReactElement => {

    const [data, setData] = useState([]);
    const [wordData, setWordData] = useState([]);
    const [excelDownLoading, setExcelDownLoading] = useState(false);


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

    const sampleTripData2 = {
        fields: [
            {name: 'datetime', format: 'YYYY-M-D H:m:s', type: 'timestamp'},
            {name: 'trip_longitude', format: '', type: 'real'},
            {name: 'trip_latitude', format: '', type: 'real'}
        ],
        rows: [
            ['2015-01-15 19:05:39 +00:00', 126.6218273, 34.4071537],
            ['2015-01-15 19:05:39 +00:00', 126.6226323, 34.4076622],
            ['2015-01-15 19:05:40 +00:00', 126.6226323, 34.4156622]
        ]
    };

    const linkToPlugMap = () => {
        props.keplerGlDispatch(addDataToMap({
            datasets: {
                info: {
                    label: 'Seoul City',
                    id: 'test_data'
                },
                data: sampleTripData2
            }
        }));
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
                title="Plug Profile DashBoard"
                description={[
                    'Plug 관제 정보를 확인 할 수 있습니다.',
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
            <Link to={'/plug/map'}>
                <Button onClick={() => linkToPlugMap()}>
                    지도 화면으로 이동
                </Button>
            </Link>

        </div>
    )


};


const mapDispatchToProps = (dispatch, props) => ({
    dispatch,
    keplerGlDispatch: forwardTo('plugMap', dispatch)
});

export default connect(
    state => state,
    mapDispatchToProps
)(PlugProfileDashBoard);

import React, {useEffect, useState} from "react";
import {Button, Col, Row, Card, Collapse} from "antd";
import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";
import {Line} from '@ant-design/plots';
import { LegendCfg } from '@antv/g2/src/interface';
import PageTitle from "@src/components/common/PageTitle";

interface State {
}

interface Props {

}

const LocationProfileDashBoard = (props: Props): React.ReactElement => {

    const [data, setData] = useState([]);
    const [excelDownLoading, setExcelDownLoading] = useState(false);
    const [tableColumns, setTableColumns] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
            .then((response) => response.json())
            .then((json) => setData(json))
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

    return (
        <div>
            <PageTitle
                title="Location Profile DashBoard"
                description={[
                    '특정 유저 그룹(Segment)의 결제 수준과 소비 성향을 확인 할 수 있습니다.',
                    '소비 특성 정보는 상대적인 소비 Score로 일반 유저(평균 0.5) 대비 소비 수준을 파악할 수 있습니다.',
                    '세그먼트를 선택하지 않으면 Active User(미인증&휴면 제외) 현황이 표시됩니다.',
                ]}
            />
            <Button
                type={'primary'}
                onClick={handleClickExcelDownload}
            >
                download
            </Button>
            <Line {...config} />
        </div>
    )


};

export default LocationProfileDashBoard
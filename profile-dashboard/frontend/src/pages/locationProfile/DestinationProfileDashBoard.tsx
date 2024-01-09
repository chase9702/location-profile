import React, {useEffect, useState} from "react";
import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";
import PageTitle from "@src/components/common/PageTitle";
import {addDataToMap, updateMap} from "kepler.gl/actions";
import {store} from "@src/index";
import {processCsvData} from "kepler.gl/processors";
import Tabs from "antd/lib/tabs";
import TabPane from "antd/es/tabs/TabPane";
import Spin from "antd/lib/spin";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import Card from "antd/lib/card";
import PersonalDestinationStatistics from "@src/components/destination/PersonalDestinationStatistics";
import GroupDestinationStatistics from "@src/components/destination/GroupDestinationStatistics";
import AddressReturn from "@src/components/destination/AddressReturn";

interface State {
}

interface Props {

}

const DestinationProfileDashBoard = (props: Props): React.ReactElement => {

    const [data, setData] = useState([]);
    const [wordData, setWordData] = useState([]);
    const [excelDownLoading, setExcelDownLoading] = useState(false);
    const [hiveData, sethiveData] = useState([])


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
                title="목적지 통계"
                description={[
                    '목적지 통계 데이터를 확인할 수 있습니다.',
                    '그룹, 개인 통계를 각각 확인 할 수 있습니다.',
                ]}
            />
            <Card style={{padding: '10px'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="개인 통계" key="1">
                        <PersonalDestinationStatistics/>
                    </TabPane>
                    <TabPane tab="그룹 통계" key="2">
                        <GroupDestinationStatistics/>
                    </TabPane>
                    <TabPane tab="데모" key="3">
                        <AddressReturn/>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )


};

export default DestinationProfileDashBoard
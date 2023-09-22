import React, {useEffect, useState} from "react";
import Spin from "antd/lib/spin";
import {get} from "@src/api";
import Column from "@ant-design/plots/lib/components/column";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import {Button} from "antd";
import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";

interface Props {

}

const PlugFirmwareVersion = (props: Props): React.ReactElement => {
    const [plugFirmwareVersionData, setPlugFirmwareVersionData] = useState([]);
    const [plugFirmwareVersionLoading, setZeroGpsMonthlyLoading] = useState(true);

    useEffect(() => {
        firmwareVersionFeych();
    }, []);

    const firmwareVersionFeych = () => {
        get<[]>("/api/plug/statistic/firmware-version-info")
            .then((jsonData) => {
                setPlugFirmwareVersionData(jsonData)
            })
            .finally(() => {
                setZeroGpsMonthlyLoading(false);
            });
    };

    const plugFirmwareVersionConfig = {
        data: plugFirmwareVersionData,
        xField: 'bsDt',
        yField: 'sumFirmwareVersion',
        seriesField: 'firmwareVersion',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
            barWidthRatio: 0.9,
        },
        label: {
            position: 'top',
            style: {
                fill: '#000',
                fontSize: 10,
            },
        },
    };

    return (
        <div>
            <Spin spinning={plugFirmwareVersionLoading} indicator={<LoadingOutlined/>} tip="로딩 중...">
                <Column {...plugFirmwareVersionConfig} />
            </Spin>
        </div>
    )

}
export default PlugFirmwareVersion;
import React, {useEffect, useState} from "react";
import {Spin} from "antd";
import {get} from "@src/api";
import {Column} from "@ant-design/plots";
import {LoadingOutlined} from "@ant-design/icons";

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
        },
        label: {
            position: 'middle',
            content: (item) => `${item.sumFirmwareVersion}`,
            style: {
                fill: '#000',
                fontSize: 12,
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
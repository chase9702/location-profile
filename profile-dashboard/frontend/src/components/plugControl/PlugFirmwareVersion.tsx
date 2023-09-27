import React from "react";
import Column from "@ant-design/plots/lib/components/column";


interface Props {

}

const PlugFirmwareVersion = (props: { plugFirmwareVersionData: any[] }): React.ReactElement => {
    const {plugFirmwareVersionData} = props;

    const plugFirmwareVersionConfig = {
        data: plugFirmwareVersionData,
        xField: 'bs_dt',
        yField: 'sum_firmware_version',
        xAxis: {
            title: {
                text: '일자',
            },
        },
        yAxis: {
            title: {
                text: '펌웨어 버젼 수',
            },
        },
        seriesField: 'firmware_version',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        slider: {
            start: 0.0,
            end: 1.0,
        },
    };

    return (
        <div>
            <Column {...plugFirmwareVersionConfig} />
        </div>
    )

}
export default PlugFirmwareVersion;
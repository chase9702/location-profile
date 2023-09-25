import React, {useEffect} from "react";
import DeviceStatisticChart from "@src/components/plugControl/device/DeviceStatisticChart";
import DeviceTripChart from "@src/components/plugControl/device/DeviceTripChart";

interface Props {
    deviceDataList: any[],
    selectedDeviceId: string
}

const DeviceChart = (props: Props): React.ReactElement => {

    useEffect(() => {
    }, [])

    return (
        <div>
            <DeviceStatisticChart
                title={"디바이스 통계 차트"}
                deviceDataList={props.deviceDataList}
                selectedDeviceId={props.selectedDeviceId}
            />
            <DeviceTripChart
                title={"트립 별 차트"}
            />
        </div>
    )
};

export default DeviceChart;

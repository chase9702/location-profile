import React, {useEffect, useRef, useState} from "react";
import Spin from "antd/lib/spin";
import {get} from "@src/api";
import Column from "@ant-design/plots/lib/components/column";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";

interface Props {

}

const PlugFirmwareVersion = (props: Props): React.ReactElement => {
    const [plugFirmwareVersionData, setPlugFirmwareVersionData] = useState([]);
    const [plugFirmwareVersionLoading, setZeroGpsMonthlyLoading] = useState(true);
    const chartContainerRef = useRef(null);
    const [chartWidth, setChartWidth] = useState(0);

    useEffect(() => {
        firmwareVersionFeych();
        observeContainerResize();

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

    const observeContainerResize = () => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    setChartWidth(entry.contentBoxSize[0].inlineSize);
                } else {
                    setChartWidth(entry.contentRect.width);
                }
            }
        });

        if (chartContainerRef.current) {
            resizeObserver.observe(chartContainerRef.current);
        }

        // 컴포넌트 언마운트 시 리사이즈 옵저버 해제
        return () => {
            resizeObserver.disconnect();
        };
    };

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
        <div ref={chartContainerRef}>
            <Spin spinning={plugFirmwareVersionLoading} indicator={<LoadingOutlined />} tip="로딩 중...">
                <Column {...plugFirmwareVersionConfig} width={chartWidth} />
            </Spin>
        </div>
    )

}
export default PlugFirmwareVersion;
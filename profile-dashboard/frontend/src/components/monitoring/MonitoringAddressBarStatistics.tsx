import {Bar} from '@ant-design/plots';
import React, {useState} from "react";
import {Card, Modal} from "antd";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";

interface Props {

}

const MonitoringAddressBarStatistics = (props: Props): React.ReactElement => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const data = [
        {year: '1951 年', value: 38},
        {year: '1952 年', value: 52},
        {year: '1956 年', value: 61},
        {year: '1957 年', value: 145},
        {year: '1958 年', value: 48},
    ];
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        // shapeField: 'hollow',
        colorField: 'year',
        legend: {
            color: {size: 72, autoWrap: true, maxRows: 3, cols: 6},
        },
        onReady: ({chart}) => {
            chart.on(`element:click`, (ev) => {
                console.log(ev.data);
                showModal()
            });
        },
    };

    return (
        <div>

            <h3>상세 주소별 TOP K</h3>
            <Bar {...config} />

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={"80%"}>
                <CustomKeplerMap id={"cityMap"} heightRatio={60}/>
            </Modal>
        </div>
    )
};

export default MonitoringAddressBarStatistics;

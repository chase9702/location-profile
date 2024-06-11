import React from "react";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import {Card, DatePickerProps, Space} from "antd";
import TimePicker from "antd/lib/time-picker";
import DatePicker from "antd/lib/date-picker";

interface Props {

}

const MonitoringMap = (props: Props): React.ReactElement => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };


    return (
        <div>
         <Card>
             <TimePicker minuteStep={15} secondStep={10} hourStep={1} />
             <Space direction="vertical">
                 <DatePicker onChange={onChange} />
                 <DatePicker onChange={onChange} picker="week" />
                 <DatePicker onChange={onChange} picker="month" />
                 <DatePicker onChange={onChange} picker="quarter" />
                 <DatePicker onChange={onChange} picker="year" />
             </Space>


         </Card>
        </div>
    )
};

export default MonitoringMap;

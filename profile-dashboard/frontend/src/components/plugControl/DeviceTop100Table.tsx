import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";
import {get} from "@src/api";

interface Props {

}

const DeviceTop100Table = (props: Props): React.ReactElement => {

    // const [data, setData] = useState([]);
    const [excelDownLoading, setExcelDownLoading] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState([]);

    const columns = [
        {
            title: '이름',
            dataIndex: 'name',
        },
        {
            title: '나이',
            dataIndex: 'age',
        },
        {
            title: '주소',
            dataIndex: 'address',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
    ];


    const getDailyDeviceInfo = () => {
        get<any>("/api/home/~~~~~")
            .then(jsonData => {
                setDeviceInfo(jsonData)
            })
            .catch((error) => {
                NotifyError(error)
            })
    }




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
            <Button
                type={'primary'}
                disabled={excelDownLoading}
                onClick={handleClickExcelDownload}
                style={{float: "right"}}
            >
                excel download
            </Button>
            <Table columns={columns} dataSource={data} />
        </div>
    )
};

export default DeviceTop100Table;

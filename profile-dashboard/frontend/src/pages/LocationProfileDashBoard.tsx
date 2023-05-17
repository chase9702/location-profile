import React, {useState} from "react";
import {Button} from "antd";
import {downloadFileFromFrontendData} from "@src/common/file-download";
import {NotifyError} from "@src/components/common/Notification";

interface State {
}

interface Props {
}

const LocationProfileDashBoard = (): React.ReactElement => {

    const [excelDownLoading, setExcelDownLoading] = useState(false);
    const [tableColumns, setTableColumns] = useState([]);
    const [tableData, setTableData] = useState([]);

    const handleClickExcelDownload = async (chartName: string) => {
        setExcelDownLoading(true);
        const columns = tableColumns.map((column) => {
            return column.title;
        });

        const values = tableData.map((data) => {
            const tmpList = [];
            for (const [key, value] of Object.entries(data)) {
                tmpList.push(value);
            }
            tmpList.pop();
            return tmpList;
        });

        try {
            await downloadFileFromFrontendData(`/api/file/funnel/data`, {
                chartName: chartName,
                columns: columns,
                values: values,
            });
        } catch (e) {
            NotifyError(e);
        }

        setExcelDownLoading(false);
    };

    return (
        <div>
            <Button>
                대시보드
            </Button>
        </div>
    )


};

export default LocationProfileDashBoard
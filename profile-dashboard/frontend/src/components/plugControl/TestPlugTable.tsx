import React, {useEffect, useState} from "react";
import {Table} from "antd";

interface Props {

}

const TestPlugTable = (props: Props): React.ReactElement => {

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

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
};

export default TestPlugTable;

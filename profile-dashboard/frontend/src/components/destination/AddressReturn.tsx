import React, {useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import {addDataToMap, removeDataset, updateMap, wrapTo} from "@kepler.gl/actions";
import {store} from "@src/index";
import {Input, Radio, Space} from "antd";
import {get} from "@src/api";
import {NotifyError} from "@src/components/common/Notification";
import {addrList} from "@src/components/destination/const-value";
import {processCsvData} from "@kepler.gl/processors";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import Spin from "antd/lib/spin";
import {encodeQueryData} from "@src/common/utils";

interface Props {

}

interface Data {
    address: string;
    h3: string;
    sd: string;
}

const AddressReturn = (props: Props): React.ReactElement => {
    const [addrSelectData, setAddrSelectData] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [radioValue, setValue] = useState(1);
    const [lnValue, setLnValue] = useState(null);
    const [ltValue, setLtValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [boundaryKeplerData, setBoundaryKeplerData] = useState("");
    const [h3KeplerData, setH3KeplerData] = useState("");

    const wrapToMap = wrapTo('addrMap')

    useEffect(() => {

        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }));

    }, []);

    const initialData = () => {
        setLoading(false)
        setLtValue(null)
        setLnValue(null)
        setButtonDisabled(true)
        setAddrSelectData(null)
    }

    const boundaryDataFetch = (queryString: string) => {
        get<Data[]>(`/api/location/address/boundary/?${queryString}`)
            .then((jsonData) => {
                let boundaryFormattedData = ""
                if (jsonData.length !== 0) {
                    boundaryFormattedData = "주소지,geometry,시/도\n" + boundaryFormatData(jsonData)
                }
                setBoundaryKeplerData(boundaryFormattedData)
            })
            .catch((error) => {
                NotifyError(error)
            })
    };

    const h3DataFetch = (queryString: string) => {
        get<Data[]>(`/api/location/address/h3/?${queryString}`)
            .then((jsonData) => {
                let h3FormattedData = ""
                if (jsonData.length !== 0) {
                    h3FormattedData = "주소지,geometry\n" + h3FormatData(jsonData)
                }
                setH3KeplerData(h3FormattedData)
            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {
                initialData()
            });
    };

    useEffect(() => {
        if (h3KeplerData !== "" || boundaryKeplerData !== "") {
            addH3DataKepler(h3KeplerData)
            addBoundaryDataKepler(boundaryKeplerData)
        }
        if (lnValue === null || ltValue === null || lnValue === "" || ltValue === "") {
            setButtonDisabled(true)
        } else if (lnValue !== "" && ltValue !== "") {
            setButtonDisabled(false)
        }
    }, [h3KeplerData, boundaryKeplerData, lnValue, ltValue]);

    const addBoundaryDataKepler = (formattedData: string) => {
        store.dispatch(removeDataset("boundary_data"));
        if (lnValue === null && ltValue === null && formattedData !== "") {
            store.dispatch(
                wrapToMap(
                    addDataToMap({
                        datasets: {
                            info: {
                                label: 'Boundary Data',
                                id: 'boundary_data',
                            },
                            data: processCsvData(formattedData),
                        },
                    }))
            );
        }
    }

    const addH3DataKepler = (formattedData: string) => {
        store.dispatch(removeDataset("h3_data"));
        if (formattedData !== "") {
            store.dispatch(
                wrapToMap(
                    addDataToMap({
                        datasets: {
                            info: {
                                label: 'h3 Data',
                                id: 'h3_data',
                            },
                            data: processCsvData(formattedData),
                        },
                    }))
            );
        }
    }

    const h3FormatData = (data: Data[]): string => {
        return data.map((item) => {
            return `"${item.h3}",${item.address}`;
        }).join('\n');
    };

    const boundaryFormatData = (data: Data[]): string => {
        return data.map((item) => {
            return `${item.address},"${item.h3}",${item.sd}`;
        }).join('\n');
    };

    const handleSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        setAddrSelectData(value);
        setLnValue(null);
        setLtValue(null);
        setButtonDisabled(false);
    };

    const makeQueryString = () => {
        const queryParams: Record<string, string | null> = {
            sd: addrSelectData,
            ln: lnValue,
            lt: ltValue,
        };
        return encodeQueryData(queryParams)
    }

    const handleClickFetchData = () => {
        const queryString = makeQueryString()
        setLoading(true)
        h3DataFetch(queryString)
        boundaryDataFetch(queryString)
    };

    const onRadioChange = (e) => {
        setButtonDisabled(true);
        setValue(e.target.value);
    };

    const handleLnValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value: inputValue} = e.target;
        setLnValue(inputValue)
        setAddrSelectData(null)
    };

    const handleLtValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value: inputValue} = e.target;
        setLtValue(inputValue)
        setAddrSelectData(null)
    };

    return (
        <div>
            <Spin spinning={loading} indicator={<LoadingOutlined/>} tip="조회 중...">
                <div>
                    <Card>
                        <Row>
                            <Col span={2}>
                                <h3>조회 조건 : </h3>
                            </Col>
                            <Col span={4}>
                                <Radio.Group onChange={onRadioChange} value={radioValue}>
                                    <Space direction="vertical">
                                        <Radio value={1}>시/도</Radio>
                                        <Radio value={2}>좌표</Radio>
                                    </Space>
                                </Radio.Group>
                            </Col>
                            <Col span={8}>
                                {radioValue === 1 && (
                                    <Select
                                        className={"h3-margin"}
                                        showSearch
                                        placeholder="시/도 선택"
                                        optionFilterProp="children"
                                        style={{
                                            width: '100%', float: 'left',
                                        }}
                                        onChange={handleSelectChange}
                                        options={addrList}
                                    >
                                        {addrList.map((data, index) => {
                                            return (
                                                <Select.Option value={data.value} key={index}>
                                                    {data.value}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select>
                                )}
                                {radioValue === 2 && (
                                    <Space direction="vertical" size={12} className={"h3-margin"}>
                                        <Row>
                                            <Col span={2}>
                                                LN:
                                            </Col>
                                            <Col span={10}>
                                                <Input
                                                    {...props}
                                                    onChange={handleLnValue}
                                                    placeholder="LN 좌표 입력"
                                                    maxLength={16}
                                                />
                                            </Col>
                                            <Col span={2}>
                                                LT:
                                            </Col>
                                            <Col span={10}>
                                                <Input
                                                    {...props}
                                                    onChange={handleLtValue}
                                                    placeholder="LT 좌표 입력"
                                                    maxLength={16}
                                                />
                                            </Col>
                                        </Row>
                                    </Space>
                                )}
                            </Col>
                            <Col span={10}>
                                <Button
                                    className={"h3-margin"}
                                    type={'primary'}
                                    style={{
                                        float: "right",
                                    }}
                                    onClick={handleClickFetchData}
                                    disabled={buttonDisabled}
                                >
                                    조회
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                    <Row>
                        <Col span={24}>

                            <CustomKeplerMap
                                heightRatio={70}
                                id={"addrMap"}
                            />
                        </Col>
                    </Row>
                </div>
            </Spin>
        </div>
    )
};

export default AddressReturn;

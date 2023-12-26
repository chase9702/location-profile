import React, {useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import {addDataToMap, updateMap, removeDataset} from "kepler.gl/actions";
import {store} from "@src/index";
import {Input, Radio, Space} from "antd";
import {get} from "@src/api";
import {NotifyError} from "@src/components/common/Notification";
import {addrList} from "@src/components/destination/const-value";
import {processCsvData} from "kepler.gl/processors";
import {useDispatch} from "react-redux";


interface Props {

}

interface Data {
    address: string;
    h3: string;
    sd: string;
}

const AddressReturn = (props: Props): React.ReactElement => {
    const [fetchData, setFetchData] = useState(false);
    const [addrSelectData, setAddrSelectData] = useState(null);
    const [parameterUrl, setParameterUrl] = useState(null)
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [radioValue, setValue] = useState(1);
    const [lnValue, setLnValue] = useState(null);
    const [ltValue, setLtValue] = useState(null);

    useEffect(() => {

        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }));

    }, []);

    const addDataKepler = (formattedData: string) => {

        store.dispatch(removeDataset("boundary_data"));

        store.dispatch(addDataToMap({
            datasets: {
                info: {
                    label: 'Boundary Data',
                    id: 'boundary_data',
                },
                data: processCsvData(formattedData),
            },
        }));

    }

    useEffect(() => {
        if (fetchData) {
            boundaryDataFetch();
            setFetchData(false);
        }
    }, [fetchData]);

    const boundaryDataFetch = () => {
        get<Data[]>(`/api/location/address/boundary/?${parameterUrl}`)
            .then((jsonData) => {
                const formattedData = "li_geo_boundary.address,li_geo_boundary.geometry,li_geo_boundary.sd\n" + formatData(jsonData)
                addDataKepler(formattedData);
            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {

            });
    };

    const formatData = (data: Data[]): string => {
        return data.map((item) => {
            return `${item.address},"${item.h3}",${item.sd}`;
        }).join('\n');
    };

    const handleSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        console.log(value);
        setAddrSelectData(value);
        setLnValue(null);
        setLtValue(null);
        setButtonDisabled(false);
    };

    const handleClickData = () => {
        const queryParams: Record<string, string | null> = {
            sd: addrSelectData,
            ln: lnValue,
            lt: ltValue,
        };

        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        console.log(queryString);
        setParameterUrl(queryString);
        setFetchData(true);
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

    useEffect(() => {
        if (lnValue !== "" && ltValue !== "") {
            setButtonDisabled(false)
        } else if (lnValue === "" || ltValue === "") {
            setButtonDisabled(true)
        }
    }, [lnValue, ltValue]);

    return (
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
                            onClick={handleClickData}
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
    )
};

export default AddressReturn;

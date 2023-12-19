import React, {useEffect, useState} from "react";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import CustomKeplerMap from "@src/components/common/CustomKeplerMap";
import {updateMap} from "kepler.gl/actions";
import {store} from "@src/index";
import {Input, Radio, Space} from "antd";
import {get} from "@src/api";
import {NotifyError} from "@src/components/common/Notification";
import {addrList} from "@src/components/destination/const-value";


interface Props {

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
        }))
    }, []);


    useEffect(() => {
        if (fetchData) {
            addrDataFetch();
            setFetchData(false);
        }
    }, [fetchData]);

    const addrDataFetch = () => {
        get<[]>(`/api/location/address/?${parameterUrl}`)
            .then((jsonData) => {
                console.log(jsonData)
            })
            .catch((error) => {
                NotifyError(error)
            })
            .finally(() => {

            });
    };

    const handleSelectChange = (value: string, option: { value: string; label: string; } | {
        value: string;
        label: string;
    }[]) => {
        console.log(value);
        setAddrSelectData(value);
        setButtonDisabled(false);
    };

    const handleClickData = () => {
        const queryParams: Record<string, string | null> = {
            city: addrSelectData,
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
    };

    const handleLtValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value: inputValue} = e.target;
        setLtValue(inputValue)
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
                            <Space direction="vertical" size={12}>
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

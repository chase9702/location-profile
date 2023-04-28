import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Input, Row, Select, Space, Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import moment, { Moment } from 'moment';

import { get } from '@src/api';
import RouteMenu from '@src/routes/RouteMenu';
import { encodeQueryData, numberFormat } from '@src/common/utils';

import PageTitle from '@src/components/common/PageTitle';
import { RestrictRangePicker } from '@src/components/common/RestrictRangePicker';
import { NotifyWarning } from '@src/components/common/Notification';

interface ServiceMetric {
    yyyymmdd: string;
    service: string;
    au: number;
    trx: number;
    tpv: number;
}

interface ChartMetricsData {
    yyyymmdd: string;
    value: number;
    name: string;
}

const Home = (): React.ReactElement => {
    const initialMetrics: string[] = ['au', 'trx', 'tpv'];

    const [metrics, setMetrics] = useState<string[]>(initialMetrics);
    const [services, setServices] = useState<string[]>(['total']);

    const [metricsData, setMetricsData] = useState<ServiceMetric[]>([]);

    const today: Moment = moment();
    const aWeekAgo: Moment = today.clone().subtract(14, 'day');
    const [dateRange, setDateRange] = useState<[Moment, Moment]>([aWeekAgo, today]);

    const [loading, setLoading] = useState<boolean>(false);

    const getServiceMetrics = () => {
        if (!dateRange || dateRange.length !== 2 || !dateRange[0] || !dateRange[1]) {
            NotifyWarning({ message: '조회 날짜 범위를 정확하게 지정해야 합니다.' });
            return;
        }

        setLoading(true);

        const [startDate, endDate] = dateRange.map((date) => date.format('YYYYMMDD'));

        get<ServiceMetric[]>(
            `/api/home/service-metrics?` + encodeQueryData({ startDate: startDate, endDate: endDate })
        ).then((serviceMetrics) => {
            // append total metrics to each date
            const dailyTotalMetrics: ServiceMetric[] = Object.values(
                serviceMetrics.reduce((acc, curr) => {
                    if (!acc[curr.yyyymmdd]) {
                        acc[curr.yyyymmdd] = { yyyymmdd: curr.yyyymmdd, service: 'total', au: 0, trx: 0, tpv: 0 };
                    }

                    acc[curr.yyyymmdd]['au'] += curr.au;
                    acc[curr.yyyymmdd]['trx'] += curr.trx;
                    acc[curr.yyyymmdd]['tpv'] += curr.tpv;

                    return acc;
                }, {})
            );

            const metrics = serviceMetrics.concat(dailyTotalMetrics);

            setMetricsData(metrics);
            setLoading(false);
        });
    };

    useEffect(() => {
        getServiceMetrics();
    }, []);

    const handleChangeDateRange = useCallback((date: [Moment, Moment]) => {
        setDateRange(date);
    }, []);

    const capitalize = (text: string) => `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;

    const makeChartData = (): [ChartMetricsData[], ChartMetricsData[]] => {
        const initialChartMetrics: { [metrics: string]: ChartMetricsData[] } = initialMetrics.reduce((acc, m) => {
            acc[m] = [];
            return acc;
        }, {});

        const chartMetricsData = metricsData.reduce((acc, curr: ServiceMetric) => {
            if (services.includes(curr.service)) {
                initialMetrics.forEach((m) => {
                    if (metrics.includes(m)) {
                        acc[m] = [
                            ...acc[m],
                            { yyyymmdd: curr.yyyymmdd, value: curr[m], name: `${capitalize(curr.service)} ${m.toUpperCase()}` },
                        ];
                    }
                });
            }

            return acc;
        }, initialChartMetrics);

        return [[...chartMetricsData['au'], ...chartMetricsData['trx']], chartMetricsData['tpv']];
    };

    const getAllServiceNames = (): string[] => {
        const uniqueServiceNames: string[] = metricsData.reduce((serviceList, curr) => {
            if (curr.service !== 'total' && !serviceList.includes(curr.service)) {
                serviceList.push(curr.service);
            }
            return serviceList;
        }, []);

        uniqueServiceNames.sort();
        uniqueServiceNames.unshift('total'); // to make total comes first

        return uniqueServiceNames;
    };

    const config = {
        data: makeChartData(),
        xField: 'yyyymmdd',
        yField: ['value', 'value'],
        yAxis: [
            {
                label: {
                    formatter: (text) => numberFormat(text),
                },
                title: {
                    text: ['au', 'trx']
                        .filter((m) => metrics.includes(m))
                        .map((m) => m.toUpperCase())
                        .join(', '),
                },
            },
            {
                label: {
                    formatter: (text) => numberFormat(text),
                },
                title: {
                    text: 'TPV',
                },
            },
        ],
        geometryOptions: [
            { geometry: 'line', seriesField: 'name', point: { shape: 'circle' } },
            { geometry: 'line', seriesField: 'name', point: { shape: 'diamond' }, lineStyle: { lineDash: [5, 5] } },
        ],
        tooltip: {
            formatter: (data) => ({ name: data.name, value: numberFormat(data.value) }),
        },
    };

    return (
        <div>
            <Row style={{ marginBottom: 32 }}>
                <Col span={24}>
                    <PageTitle
                        title="Customer eXperience Management (CXM)"
                        description={[
                            'CXM은 카카오페이의 고객을 분석할 수 있는 플랫폼입니다.',
                            '필터를 이용하여 세분화 된 고객 그룹을 생성하고 추출할 수 있습니다.',
                            '유저들의 행동 분석을 통해 마케팅, 서비스 기획 및 운영, 비즈니스 측면에서 다양한 인사이트를 얻을 수 있습니다.',
                        ]}
                    />
                    <Card>
                        <Typography>
                            <Typography.Paragraph>
                                <ul>
                                    {RouteMenu.filter((menu) => menu.desc).map((menu) => (
                                        <li key={menu.key}>
                                            <Link to={menu.submenu[0].to}>{menu.name}</Link>
                                            <br />
                                            {menu.desc}
                                        </li>
                                    ))}
                                </ul>
                            </Typography.Paragraph>
                        </Typography>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[0, 8]}>
                <Col span={12}>
                    <Space>
                        <Select
                            mode="multiple"
                            placeholder="지표 선택"
                            style={{ width: 200 }}
                            value={metrics}
                            onChange={(metrics) => setMetrics(metrics)}
                        >
                            {initialMetrics.map((metric) => (
                                <Select.Option key={metric} value={metric}>
                                    {metric.toUpperCase()}
                                </Select.Option>
                            ))}
                        </Select>
                        <Select
                            allowClear
                            mode="multiple"
                            placeholder="서비스 선택"
                            style={{ width: 240 }}
                            value={services}
                            onChange={(value: string[]) => setServices(value)}
                        >
                            {getAllServiceNames().map((service) => (
                                <Select.Option key={service} value={service}>
                                    {capitalize(service)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Space>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Input.Group compact>
                        <RestrictRangePicker
                            defaultValue={dateRange}
                            onChange={handleChangeDateRange}
                            unitOfDiff="day"
                            maxOfDiff={31}
                        />
                        <Button loading={loading} onClick={getServiceMetrics}>
                            조회
                        </Button>
                    </Input.Group>
                </Col>
                <Col span={24}>
                    <Card>
                        <Spin spinning={loading} indicator={<LoadingOutlined />}>
                            <DualAxes {...config} />
                        </Spin>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Home;

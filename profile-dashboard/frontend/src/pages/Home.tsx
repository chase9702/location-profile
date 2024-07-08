import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Line from '@ant-design/plots/lib/components/line';
import Card from 'antd/lib/card';
import CustomKeplerMap from '@src/components/common/CustomKeplerMap';
import { store } from '@src/index';
import { updateMap } from '@kepler.gl/actions';
import { get } from '@src/api';
import PageTitle from '@src/components/common/PageTitle';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Spin from 'antd/lib/spin';
import { useSelector } from 'react-redux';
import { StoreState } from '@src/reducers';

// 동적 import

const Home = (): React.ReactElement => {
  const accessToken = useSelector(
    (state: StoreState) => state.auth.accessToken
  );
  const [homeDeviceCountData, setHomeDeviceCountData] = useState([]);
  const [homeDeviceLoading, setHomeDeviceLoading] = useState(true);

  useEffect(() => {
    if (accessToken !== null) {
      homeDeviceCountFetch();
    }
  }, [accessToken]);

  const homeDeviceCountFetch = () => {
    get<[]>('/api/home/device-count-info')
      .then((jsonData) => {
        console.log(jsonData);
        setHomeDeviceCountData(jsonData);
      })
      .finally(() => {
        setHomeDeviceLoading(false);
      });
  };

  const homeDeviceCountConfig = {
    data: homeDeviceCountData,
    xField: 'bs_dt',
    yField: 'dvc_count',
    seriesField: 'dvc_gb',
    yAxis: {
      label: {
        content: (item) => `${item.dvc_count}`, // 각 데이터의 값을 라벨로 표시
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,

    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  useEffect(() => {
    store.dispatch(
      updateMap({
        latitude: 37.5658,
        longitude: 126.9889, // 캐롯 좌표
      })
    );
  }, []);

  return (
    <div>
      <PageTitle
        title="Location Intelligence (LI)"
        description={[
          'LI는 캐롯의 위치정보를 분석할 수 있는 플랫폼입니다.',
          '플러그관제를 하실 수 있습니다.',
          '위치정보 데이터들을 이용하여 다양한 인사이트를' +
            ' 얻을 수 있습니다.',
        ]}
      />
      <CustomKeplerMap heightRatio={70} id={'homeMap'} />
      <Card style={{ padding: '10px' }}>
        <div>
          <h3>월별 디바이스 현황</h3>
          <Spin
            spinning={homeDeviceLoading}
            indicator={<LoadingOutlined />}
            tip="로딩 중..."
          >
            <Line {...homeDeviceCountConfig} />
          </Spin>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(Home);

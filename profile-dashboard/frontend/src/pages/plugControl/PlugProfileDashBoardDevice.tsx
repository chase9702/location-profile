import React from 'react';
import { withRouter } from 'react-router-dom';
import './plug.less';
import PageTitle from '@src/components/common/PageTitle';
import DeviceTopTab from '@src/components/plugControl/device/DeviceTopTab';

const PlugProfileDashBoardDevice = (): React.ReactElement => {
  return (
    <div>
      <PageTitle
        title="Plug Device DashBoard"
        description={[
          '디바이스별 위치정보를 바탕으로 한 데이터를 확인 할 수 있습니다.',
          '플러그 디바이스의 Top 100 데이터를 확인 할 수 있습니다.',
        ]}
      />
      <DeviceTopTab />
    </div>
  );
};

export default withRouter(PlugProfileDashBoardDevice);

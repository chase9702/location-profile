import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, MenuProps} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import RouteMenu from '@src/routes/RouteMenu';


// import './menus.less';

const {SubMenu} = Menu;



const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const SideMenus = (): React.ReactElement => {
    return (
        <div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                items={items1}
            />
        </div>
    );
}


export default SideMenus;

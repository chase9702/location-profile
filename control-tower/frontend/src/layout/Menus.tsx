import React from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import RouteMenu from '@src/routes/RouteMenu';


// import './menus.less';

const {SubMenu} = Menu;



const Menus = (): React.ReactElement => {
    return (
        <div>
            <Menu
                theme="dark"
                mode="horizontal"
                // className="cube-header-menus"
                // selectedKeys={[this.state.selectedMenu]}
                // onClick={this.handleMenuChanged}
            >
                <Menu.Item key="home">
                    <HomeOutlined />
                    <Link to="/"/>
                </Menu.Item>
                {RouteMenu.map((menu) => {
                    return (

                        <SubMenu key={menu.key} title={menu.name}>
                            {menu.submenu &&
                                menu.submenu.map((sub) => {
                                    return (

                                        <Menu.Item key={sub.key}>
                                            <span>{sub.name}</span>
                                            <Link to={sub.to}/>
                                        </Menu.Item>

                                    );
                                })}
                        </SubMenu>

                    );
                })}
            </Menu>
        </div>
    );
}


export default Menus;

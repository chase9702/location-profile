import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {Menu, Button, Typography} from 'antd';
import {BuildOutlined, LogoutOutlined} from '@ant-design/icons';
import RouteMenu from '@src/routes/RouteMenu';

import {StoreState} from '@src/reducers';


import './menus.less';

const {SubMenu} = Menu;
const {Text} = Typography;

interface Props extends RouteComponentProps {
}

interface State {
    selectedMenu: string;
}

class Menus extends React.Component<Props, State> {
    state = {
        selectedMenu: '',
    };

    handleMenuChanged = (e) => {
        this.setState({
            selectedMenu: e.key,
        });
    };

    handleClickLogOut = async () => {

    };

    renderMenus = () => {
        return RouteMenu.map((menu) => {
            return (
                hasPermission(this.props.auth.role, this.props.auth.pageList, menu.name, menu.auth) && (
                    <SubMenu key={menu.key} title={menu.name}>
                        {menu.submenu &&
                            menu.submenu.map((sub) => {
                                return (
                                    hasPermission(this.props.auth.role, this.props.auth.pageList, sub.name, sub.auth) && (
                                        <Menu.Item key={sub.key}>
                                            <span>{sub.name}</span>
                                            <Link to={sub.to}/>
                                        </Menu.Item>
                                    )
                                );
                            })}
                    </SubMenu>
                )
            );
        });
    };

    renderUserInfo = () => {
        return (
            <Text className="user-info">
                {this.props.auth.name} / {this.props.auth.dept}
                {this.props.auth.isMarketer ? ' (marketing)' : ' (non-marketing)'}
            </Text>
        );
    };

    render(): React.ReactElement {
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    className="cube-header-menus"
                    selectedKeys={[this.state.selectedMenu]}
                    onClick={this.handleMenuChanged}
                >
                    <Menu.Item key="home">
                        <BuildOutlined className="cube-main-icon"/>
                        <Link to="/"/>
                    </Menu.Item>
                    {this.renderMenus()}
                </Menu>
                <Button type="link" icon={<LogoutOutlined/>} className="logout-button" onClick={this.handleClickLogOut}>
                    Logout
                </Button>
                {this.props.auth.name && this.renderUserInfo()}
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menus));

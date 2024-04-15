import React, {useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Menu from 'antd/lib/menu';
import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined'
import RouteMenu from '@src/routes/RouteMenu';
import {useDispatch, useSelector} from "react-redux";
import {setSelectMenu} from "@src/actions/MenuSelectAction";
import './menus.less';
import {setAccessToken, setAuthInfo, setRefreshToken, setSSOId, setTokenExpDate} from "@src/actions/AuthAction";
import {hasPermission} from "@src/routes";
import {Button} from "antd";
import {clearLocalStorage} from "@src/common/auth/constantValue";
import {logoutApi} from "@src/common/auth/AuthProvider";
import {StoreState} from "@src/reducers";

const {SubMenu} = Menu;


const Menus = (): React.ReactElement => {

    const dispatch = useDispatch();
    const userName = window.localStorage.getItem("userName");
    const userRole = window.localStorage.getItem("userRole");
    const storedUserRole = useSelector((state: StoreState) => state.auth.userRole)
    const logout = () => {

        clearLocalStorage()
        dispatch(setAuthInfo({
            userName: "UNKNOWN",
            userRole: [''],
        }))
        dispatch(setSSOId("UNKNOWN"))
        dispatch(setAccessToken(null))
        dispatch(setRefreshToken(null))
        dispatch(setTokenExpDate(0))
        logoutApi()
    }

    useEffect(()=>{

    },[storedUserRole])


    const renderMenu = () => {
        return (
            RouteMenu.map((menu) => {
                return (
                    hasPermission(userRole, menu.auth) && (
                        <SubMenu key={menu.key} title={menu.name}>
                            {menu.submenu &&
                                menu.submenu.map((sub) => {
                                    return (
                                        <Menu.Item key={sub.key}
                                                   onClick={() => dispatch(setSelectMenu(sub.key))}>
                                            <span>{sub.name}</span>
                                            <Link to={sub.to}/>
                                        </Menu.Item>

                                    );
                                })}
                        </SubMenu>
                    )
                );
            })
        )
    }

    return (
        <div>
            <Menu
                theme="dark"
                mode="horizontal"
                className="cube-header-menus"
            >
                <Menu.Item key="home">
                    <HomeOutlined
                        className="cube-main-icon"
                    />
                    <Link to="/"/>
                </Menu.Item>
                {renderMenu()}
            </Menu>
            {userName !== 'UNKNOWN' ?
                <Button type="link" icon={<LogoutOutlined/>} className="logout-button" onClick={logout}>
                    Logout
                </Button>
                : <div></div>}

        </div>
    );

}


export default withRouter(Menus);

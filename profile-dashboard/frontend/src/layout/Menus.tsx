import React, {Component, useEffect} from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {Button, Menu} from 'antd';
import {HomeOutlined, LogoutOutlined} from '@ant-design/icons';
import RouteMenu from '@src/routes/RouteMenu';
import {useDispatch, useSelector} from "react-redux";
import {setSelectMenu} from "@src/actions/MenuSelectAction";
import './menus.less';
import {authGet, authPut} from "@src/api";
import {NotifyError} from "@src/components/common/Notification";
import {setAccessToken, setAuthInfo, setRefreshToken, setSSOId} from "@src/actions/AuthAction";
import {StoreState} from "@src/reducers";

const {SubMenu} = Menu;


const Menus = (): React.ReactElement => {

    const dispatch = useDispatch();
    const userRole = useSelector((state: StoreState) => state.auth.userRole)
    const userName = useSelector((state: StoreState) => state.auth.userName)


    const deleteAllCookies = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }

    const logout = () => {

        window.localStorage.removeItem("profileAccessToken");
        window.localStorage.removeItem("profileRefreshToken");

        dispatch(setAuthInfo({
            userName: "UNKNOWN",
            userRole: "UNKNOWN",
        }))

        dispatch(setSSOId("UNKNOWN"))

        dispatch(setAccessToken(undefined))
        dispatch(setRefreshToken(undefined))

        authPut<any>("/auth/sso/logout", null)
            .then((jsonData) => {
                if (jsonData.redirectUrl === undefined) {
                    console.log("log out redirect undefined")
                    return;
                } else {

                    deleteAllCookies();
                    window.location.href = "/"

                }
            }).catch((e) => {
            NotifyError(e);
        });
    }

    useEffect(() => {
        console.log("userRole changed:", userRole);
        console.log("userName changed:", userName);
    }, [userRole, userName]);
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
                {RouteMenu.map((menu) => {
                    return (

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

                    );
                })}
            </Menu>
            <Button type="link" icon={<LogoutOutlined/>} className="logout-button" onClick={logout}>
                Logout
            </Button>
        </div>
    );

}


export default withRouter(Menus);

import React, {useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Menu from 'antd/lib/menu';
import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined'
import RouteMenu from '@src/routes/RouteMenu';
import {useDispatch, useSelector} from "react-redux";
import {setSelectMenu} from "@src/actions/MenuSelectAction";
import './menus.less';
import {authApi, authGet, authPut} from "@src/api";
import {setAccessToken, setAuthInfo, setRefreshToken, setSSOId} from "@src/actions/AuthAction";
import {StoreState} from "@src/reducers";
import {hasPermission} from "@src/routes";
import {Button} from "antd";
import {baseUrl, clearLocalStorage} from "@src/common/auth/constantValue";
import {NotifyError} from "@src/components/common/Notification";

const {SubMenu} = Menu;


const Menus = (): React.ReactElement => {

    const dispatch = useDispatch();
    const userRole = useSelector((state: StoreState) => state.auth.userRole)
    const userName = useSelector((state: StoreState) => state.auth.userName)

    const logout =  () => {

        clearLocalStorage()
        authPut<any>("/auth/sso/logout", null)
            .then((jsonData) => {
                if (jsonData.redirectUrl === undefined) {
                    return
                } else {
                    dispatch(setAuthInfo({
                        userName: "UNKNOWN",
                        userRole: [''],
                    }))
                    dispatch(setSSOId("UNKNOWN"))
                    dispatch(setAccessToken(null))
                    dispatch(setRefreshToken(null))
                    authGet(jsonData.redirectUrl)
                        .then(() => {
                        })!
                        .finally(() => {
                            window.location.href = "/"
                        })
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
                })}

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

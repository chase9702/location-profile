import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import type {MenuProps} from 'antd';
import Menus from "@src/layout/Menus";
import Pages from "@src/layout/Pages";
import SideMenus from "@src/layout/SideMenus";
import { useSelector } from 'react-redux';

const {Header, Content, Sider} = Layout;
import {StoreState} from '@src/reducers';


const App = () => {


    const myValue = useSelector((state:StoreState) => state.menuSelect.selectedMenu)
    console.log(myValue)
    return (
        <Router>
            <Layout style={{height: '100vh'}}>
                <Header>
                    <Menus/>
                </Header>
                <Layout>
                    {/*<Sider width={200}>*/}
                    {/*    <SideMenus/>*/}
                    {/*</Sider>*/}
                    <Content style={{padding: '10px 50px', overflow: 'auto'}}>
                        <Pages/>
                    </Content>
                </Layout>

            </Layout>
        </Router>
    );
};
export default App;
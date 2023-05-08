import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import {Layout} from 'antd';
import Menus from "@src/layout/Menus";
import Pages from "@src/layout/Pages";

const {Header, Content, Sider} = Layout;


const App = () => {
    // const myValue = useSelector((state: StoreState) => state.menuSelect.selectedMenu)
    // console.log(myValue)
    return (
        <Router>
            <Layout style={{height: '100vh'}}>
                <Header>
                    <Menus/>
                </Header>
                <Layout>
                    <Content style={{padding: '10px 50px', overflow: 'auto'}}>
                        <Pages/>
                    </Content>
                </Layout>

            </Layout>
        </Router>

    );
};
export default App;
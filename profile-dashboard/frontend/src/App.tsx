import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import {Layout} from 'antd';
import Menus from "@src/layout/Menus";
import Pages from "@src/layout/Pages";
import AuthProvider from "@src/common/auth/AuthProvider";
import WithTimer from "@src/common/auth/WithTimer";


const {Header, Content} = Layout;


const App = () => {
    return (
        <AuthProvider>
            <WithTimer>
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
            </WithTimer>
        </AuthProvider>

    );
};
export default App;
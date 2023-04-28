import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const App = () => {
    return (
        <Router>
            <Layout style={{ height: '100vh' }}>
                <Header>
                    <Menus />
                </Header>
                <Content style={{ padding: '10px 50px', overflow: 'auto' }}>
                    <Pages />
                </Content>
            </Layout>
        </Router>
    );
};
export default App;
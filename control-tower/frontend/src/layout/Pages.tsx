import React, { Component, Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { StoreState } from '@src/reducers';
import RouteMenu, { MenuInfo } from '@src/routes/RouteMenu';

import { get } from '@src/api';

import Home from '@src/pages/Home';
import Login from '@src/pages/Login';

interface Props extends RouteComponentProps {
    auth: AuthState;
    AuthAction: typeof AuthAction;
}

interface State {
    checkAuth: boolean;
}

class Pages extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = { checkAuth: false };

        if (!props.auth.authenticated) {
            get<Auth>(`/api/auth`)
                .then((auth) => {
                    props.AuthAction.setAuth(auth);
                    this.setState({ checkAuth: true });
                })
                .catch((e) => {
                    props.history.push('/login');
                    this.setState({ checkAuth: true });
                });
        }
    }

    render(): React.ReactElement {
        const submenus: MenuInfo[] = [].concat(...RouteMenu.map((menu) => menu.submenu));

        return (
            <Suspense
                fallback={
                    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spin size="large" indicator={<LoadingOutlined />} tip="Loading..." />
                    </div>
                }
            >
                <Switch>
                    <AuthRoute
                        checked={this.state.checkAuth}
                        auth={this.props.auth}
                        exact={true}
                        path="/"
                        menuName="Home"
                        component={Home}
                    />
                    {submenus.map((sub) => (
                        <AuthRoute
                            key={sub.key}
                            checked={this.state.checkAuth}
                            auth={this.props.auth}
                            path={sub.to}
                            menuName={sub.name}
                            menuAuth={sub.auth}
                            component={sub.component}
                        />
                    ))}
                    <Route
                        path="/login"
                        render={(props) => {
                            return <Login {...props.location.state} />;
                        }}
                    />
                    <Route component={PageNotFound} />
                </Switch>
            </Suspense>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    // auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    // AuthAction: bindActionCreators(AuthAction, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pages));

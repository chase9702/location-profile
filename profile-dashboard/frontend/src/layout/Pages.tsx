import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import RouteMenu, {MenuInfo} from '@src/routes/RouteMenu';
import Home from "@src/pages/Home";


const Pages = (): React.ReactElement => {
    const submenus: MenuInfo[] = [].concat(...RouteMenu.map((menu) => menu.submenu));
    return (
        <Switch>
            <Route exact={true} path={"/"}>
                <Home/>
            </Route>
            {submenus.map((sub, key) => (
                <Route key={key} exact={true} path={sub.to} component={sub.component}/>
            ))}
        </Switch>
    )

}
export default withRouter(Pages);

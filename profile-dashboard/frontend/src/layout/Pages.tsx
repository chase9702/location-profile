import React, { Component } from 'react';
import {withRouter, Route, Switch, RouteComponentProps} from 'react-router-dom';
import RouteMenu, {MenuInfo} from '@src/routes/RouteMenu';
import Home from "@src/pages/Home";
import LocationProfileDashBoard from "@src/pages/LocationProfileDashBoard";
import LocationProfileMap from "@src/pages/LocationProfileMap";



const Pages = (): React.ReactElement => {

        return (
            <Switch>
                <Route path={"/"}
                       component={Home}
                />
                <Route path={"/location/dashboard"}
                       component={LocationProfileDashBoard}
                />
                <Route path={"/location/map"}
                       component={LocationProfileMap}
                />
            </Switch>
        )

}
export default withRouter(Pages);

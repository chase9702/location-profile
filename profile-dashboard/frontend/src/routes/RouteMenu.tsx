import React from "react";
import {ConnectedComponent} from 'react-redux';
import LocationProfileDashBoard from "@src/pages/LocationProfileDashBoard";
import LocationProfileMap from "@src/pages/LocationProfileMap";
import { Result } from 'antd';
import Home from "@src/pages/Home";


export interface MenuInfo {
    readonly name: string;
    readonly key: string;
    readonly desc?: string;
    readonly to?: string;
    readonly component?:  React.ComponentClass | ConnectedComponent<any, any>;
    readonly submenu?: MenuInfo[];
}

const RouteMenu: MenuInfo[] = [
    {
        name: 'Location Profile',
        key: 'location-profile',
        desc: 'Location Profile 제공.',
        submenu: [
            {
                name: 'Dashboard',
                key: 'location-dashboard',
                to: '/location/dashboard',
                component: LocationProfileDashBoard,
            },
            {
                name: 'Location Map',
                key: 'location-map',
                to: '/location/map',
                component: LocationProfileMap,
            }
        ],
    }
];

export default RouteMenu;
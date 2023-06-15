import React from "react";
import LocationProfileDashBoard from "@src/pages/locationProfile/LocationProfileDashBoard";
import LocationProfileMap from "@src/pages/locationProfile/LocationProfileMap";
import PlugProfileDashBoard from "@src/pages/plugControl/PlugProfileDashBoard";
import PlugProfileMap from "@src/pages/plugControl/PlugProfileMap";


export interface MenuInfo {
    readonly name: string;
    readonly key: string;
    readonly desc?: string;
    readonly to?: string;
    readonly component?: any;
    readonly submenu?: MenuInfo[];
}

const RouteMenu: MenuInfo[] = [
    {
        name: 'Plug Profile',
        key: 'plug',
        desc: 'plug Profile 제공.',
        submenu: [
            {
                name: 'Plug Dashboard',
                key: 'plug-dashboard',
                to: '/plug/dashboard',
                component: PlugProfileDashBoard,
            },
            {
                name: 'Plug Map',
                key: 'plug-map',
                to: '/plug/map',
                component: PlugProfileMap,
            }
        ],
    },
    {
        name: 'Location Profile',
        key: 'location',
        desc: 'Location Profile 제공.',
        submenu: [
            {
                name: 'Location Dashboard',
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
import React from "react";
import LocationProfileDashBoard from "@src/pages/LocationProfileDashBoard";
import LocationProfileMap from "@src/pages/LocationProfileMap";


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
        name: 'Location Profile',
        key: 'location',
        desc: 'Location Profile 제공.',
        submenu: [
            {
                name: 'Profile Dashboard',
                key: 'location-dashboard',
                to: '/location/dashboard',
                component: LocationProfileDashBoard,
             },
            {
                name: 'Profile Map',
                key: 'location-map',
                to: '/location/map',
                component: LocationProfileMap,
            }
        ],
    }
];

export default RouteMenu;
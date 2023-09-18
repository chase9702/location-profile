import React from "react";
import LocationProfileDashBoard from "@src/pages/locationProfile/LocationProfileDashBoard";
import PlugProfileDashBoard from "@src/pages/plugControl/PlugProfileDashBoard";
import PlugProfileDashBoardStatistics from "@src/pages/plugControl/PlugProfileDashBoardStatistics";
import PlugProfileDashBoardDevice from "@src/pages/plugControl/PlugProfileDashBoardDevice";




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
                name: 'Plug Statistics',
                key: 'plug-dashboard-statistics',
                to: '/plug/dashboard/statistics',
                component: PlugProfileDashBoardStatistics
            },
            {
                name: 'Plug Devices',
                key: 'plug-dashboard-devices',
                to: '/plug/dashboard/devices',
                component: PlugProfileDashBoardDevice
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
             }
        ],
    }
];

export default RouteMenu;
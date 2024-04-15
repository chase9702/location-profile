import React from "react";
import PlugProfileDashBoardStatistics from "@src/pages/plugControl/PlugProfileDashBoardStatistics";
import PlugProfileDashBoardDevice from "@src/pages/plugControl/PlugProfileDashBoardDevice";
import PlugProfileMap from "@src/pages/plugControl/PlugProfileMap";
import DestinationProfileDashBoard from "@src/pages/locationProfile/DestinationProfileDashBoard";




export interface MenuInfo {
    readonly name: string;
    readonly key: string;
    readonly desc?: string;
    readonly to?: string;
    readonly component?: any;
    readonly auth?: string;
    readonly submenu?: MenuInfo[];
}

const RouteMenu: MenuInfo[] = [
    {
        name: 'Location Profile',
        key: 'location',
        desc: 'Location Profile 제공.',
        auth: 'ROLE_DASHBOARD',
        submenu: [
            {
                name: '목적지 통계',
                key: 'destination',
                to: '/destination/dashboard',
                component: DestinationProfileDashBoard,
             }
        ],
    },
    {
        name: 'Plug Profile',
        key: 'plug',
        desc: 'plug Profile 제공.',
        auth: 'ROLE_DASHBOARD',
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
            },
            {
                name: 'Plug Map',
                key: 'plug-dashboard-map',
                to: '/plug/dashboard/map',
                component: PlugProfileMap
            },
        ],
    },
];

export default RouteMenu;
import React from "react";
import LocationProfileDashBoard from "@src/pages/locationProfile/LocationProfileDashBoard";
import PlugProfileDashBoard from "@src/pages/plugControl/PlugProfileDashBoard";
import PlugProfileDashBoardStatistics from "@src/pages/plugControl/PlugProfileDashBoardStatistics";




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
                component: PlugProfileDashBoard
            },
            {
                name: 'Plug Dashboard 통계',
                key: 'plug-dashboard-statistics',
                to: '/plug/dashboard/Statistics',
                component: PlugProfileDashBoardStatistics
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
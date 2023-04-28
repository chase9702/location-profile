import * as React from 'react';
import {ConnectedComponent} from 'react-redux';

export interface MenuInfo {
    readonly name: string;
    readonly key: string;
    readonly desc?: string;
    readonly auth?: string;
    readonly to?: string;
    readonly component?: React.LazyExoticComponent<
        typeof React.Component | React.FunctionComponent | ConnectedComponent<any, any>
    >;
    readonly submenu?: MenuInfo[];
}

const RouteMenu: MenuInfo[] = [
    {
        name: 'Customer Profile',
        key: 'profile',
        desc: '전반적으로 카카오페이 고객들의 데모그래픽과 라이프스타일에 대한 정보를 제공합니다.',
        submenu: [
            {
                name: 'Customer Index',
                key: 'profile-summary',
                to: '/profile/index',
                component: Summary,
            },
            {
                name: 'Customer Profile',
                key: 'au-profile',
                to: '/profile/au-profile',
                component: AuProfile,
            },
            {
                name: 'Profile Dashboard',
                key: 'profile-dashboard',
                to: '/profile/profile-dashboard',
                component: AuProfileDashBoard,
            },
        ],
    },
    {
        name: 'Segment',
        key: 'segment',
        desc:
            '필터 기능을 이용한 특정 유저 그룹(세그먼트)을 생성할 수 있습니다. 저장된 세그먼트는 수정 및 추출, 분석 화면에서 활용됩니다.',
        submenu: [
            {
                name: 'Target Group',
                key: 'segment-group',
                to: '/segment/group',
                component: TargetGroup,
            },
            {
                name: 'Segment Performance',
                key: 'segment-performance',
                to: '/segment/performance',
                component: SegmentPerformance,
            },
        ],
    },
    {
        name: 'Behaviour',
        key: 'behaviour',
        desc: '서비스 유입부터 이탈까지 유저들의 행동을 분석합니다.',
        submenu: [
            {
                name: 'Funnel analysis',
                key: 'behaviour-funnel',
                to: '/behaviour/funnel',
                component: Funnel,
            },
            {
                name: 'Cohort analysis',
                key: 'behaviour-cohort',
                to: '/behaviour/cohort',
                component: Cohort,
            },
            {
                name: 'Cross use analysis',
                key: 'behaviour-crossuse',
                to: '/behaviour/crossuse',
                component: CrossUse,
            },
            {
                name: 'Page analysis',
                key: 'behaviour-page',
                to: '/behaviour/page',
                component: Page,
            },
            {
                name: 'User Flow analysis',
                key: 'behaviour-userflow',
                to: '/behaviour/userflow',
                component: UserFlow,
            },
        ],
    },
    {
        name: 'Analysis',
        key: 'analysis',
        desc: '데이터 팀에서 진행한 다양한 주제의 분석들을 제공합니다.',
        submenu: [
            {
                name: 'Analysis Report',
                key: 'analysis-report',
                to: '/analysis/report',
                component: Report,
            },
        ],
    },
    {
        name: 'Admin',
        key: 'admin',
        auth: 'admin',
        submenu: [
            {
                name: 'Filter',
                auth: 'admin',
                key: 'admin-filter',
                to: '/admin/filter',
                component: AdminFilter,
            },
            {
                name: 'Report',
                auth: 'admin',
                key: 'admin-report',
                to: '/admin/report',
                component: AdminReport,
            },
            {
                name: 'Manage',
                auth: 'admin',
                key: 'admin-manage',
                to: '/admin/manage',
                component: AdminManage,
            },
        ],
    },
];

export default RouteMenu;
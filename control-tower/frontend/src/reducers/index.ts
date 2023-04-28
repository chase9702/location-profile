import { combineReducers } from 'redux';

export interface StoreState {
    // auth: AuthState;
    // segment: {
    //     info: SegmentState;
    //     panel: SegmentPanelState;
    // };
    // summary: SummaryState;
    // funnel: FunnelMetaState;
    // report: ReportState;
    // admin: {
    //     report: AdminReportState;
    //     manage: AdminManageState;
    // };
    // crossUse: CrossUseState;
    // auProfile: AuProfileState;
    // auProfileDashBoard: AuProfileDashBoardState;
    // page: PageState;
    // userFlow: UserFlowState;
}

const rootReducer = combineReducers<StoreState>({
    // auth: authReducer,
    // segment: combineReducers({
    //     info: segmentReducer,
    //     panel: segmentPanelReducer,
    // }),
    // summary: summaryReducer,
    // funnel: funnelReducer,
    // report: reportReducer,
    // admin: combineReducers({
    //     report: adminReportReducer,
    //     manage: adminManageReducer,
    // }),
    // crossUse: crossUseReducer,
    // auProfile: auProfileReducer,
    // auProfileDashBoard: auProfileDashBoardReducer,
    // page: pageReducer,
    // userFlow: userFlowReducer,
});

export default rootReducer;
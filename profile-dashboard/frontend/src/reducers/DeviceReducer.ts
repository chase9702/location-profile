import {
    SET_SELECT_DEVICE_ID,
    SET_TRIP_DATA,
    SET_SELECT_DEVICE_GB,
    SET_SELECT_DATE
} from "@src/actions/DeviceAction"

export interface DeviceState {
    selectedDeviceId: string
    selectedDeviceGb: string
    tripData: [],
    date: string,
}

export const initialState: DeviceState = {
    selectedDeviceId: '',
    selectedDeviceGb: 'TOTAL',
    tripData: [],
    date: '',
}

const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECT_DEVICE_ID: {
            return {
                ...state,
                selectedDeviceId: action.deviceId
            }
        }
        case SET_SELECT_DATE: {
            return {
                ...state,
                date: action.date
            }
        }
        case SET_SELECT_DEVICE_GB: {
            return {
                ...state,
                selectedDeviceGb: action.deviceGb
            }
        }
        case SET_TRIP_DATA: {
            return {
                ...state,
                tripData: action.tripData
            }
        }
        default:
            return state;
    }
}

export default deviceReducer
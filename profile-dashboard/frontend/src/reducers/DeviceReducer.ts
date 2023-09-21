import {
    SET_SELECT_DEVICE
} from "@src/actions/DeviceAction"

export interface DeviceState {
    selectedDeviceId: string;
}

export const initialState: DeviceState = {
    selectedDeviceId: ''
}

const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECT_DEVICE: {
            return {
                ...state,
                selectedDeviceId: action.deviceId
            }
        }
        default:
            return state;
    }
}

export default deviceReducer
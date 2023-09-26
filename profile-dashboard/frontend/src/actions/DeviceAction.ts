// 액션
export const SET_SELECT_DEVICE_ID = "SET_SELECT_DEVICE_ID";
export const SET_SELECT_DEVICE_GB = "SET_SELECT_DEVICE_GB";
export const SET_TRIP_DATA = "SET_TRIP_DATA";
export const SET_SELECT_DATE = "SET_SELECT_DATE";

// 액션 생성 함수
export const setSelectDeviceId = (deviceId:string) =>{
    return{
        type:SET_SELECT_DEVICE_ID,
        deviceId
    }
};

export const setSelectDate = (date:string) =>{
    return{
        type:SET_SELECT_DATE,
        date
    }
};

export const setSelectDeviceGb = (deviceGb:string) =>{
    return{
        type:SET_SELECT_DEVICE_GB,
        deviceGb
    }
};

export const setTripData = (tripData:[]) =>{
    return{
        type:SET_TRIP_DATA,
        tripData
    }
};

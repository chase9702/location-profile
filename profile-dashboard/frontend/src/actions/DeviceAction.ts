// 액션
export const SET_SELECT_DEVICE = "SET_SELECT_DEVICE";


// 액션 생성 함수
export const setSelectDeviceId = (deviceId:string) =>{
    return{
        type:SET_SELECT_DEVICE,
        deviceId
    }
};

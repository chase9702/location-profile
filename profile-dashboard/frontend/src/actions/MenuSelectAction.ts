// 액션
export const SET_SELECT_MENU = 'SET_SELECT_MENU';

// 액션 생성 함수
export const setSelectMenu = (menuName: string) => {
  return {
    type: SET_SELECT_MENU,
    menuName,
  };
};

import { CHANGE_MENU_OPTION } from './actionType';

const defaultState = {
    selectedKeys: localStorage.getItem("_menuitem") ? JSON.parse(localStorage.getItem("_menuitem")) : ['/home']
}

export default (state = defaultState, action) => {
    if (action.type === CHANGE_MENU_OPTION) {
        return {
            ...state,
            selectedKeys: [action.selectedKeys]
        }
    }
    return { ...state };
}
import { CHANGE_MENU_OPTION, SEARCH_DATA_CONDITION } from './actionType';

const defaultState = {
    search: [],
    selectedKeys: localStorage.getItem("_menuitem") ? JSON.parse(localStorage.getItem("_menuitem")) : ['/home']
}

export default (state = defaultState, action) => {
    if (action.type === CHANGE_MENU_OPTION) {
        return {
            ...state,
            selectedKeys: [action.selectedKeys]
        }
    }
    if (action.type === SEARCH_DATA_CONDITION) {
        return {
            ...state,
            search: action.search
        }
    }
    return { ...state };
}
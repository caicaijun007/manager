import { CHANGE_MENU_OPTION, SEARCH_DATA_CONDITION } from './actionType';

export function switchMenuOption(selectedKeys) {
    return {
        type: CHANGE_MENU_OPTION,
        selectedKeys
    }
}

export function searchData(search) {
    return {
        type: SEARCH_DATA_CONDITION,
        search
    }
}
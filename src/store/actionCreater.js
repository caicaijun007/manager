import { CHANGE_MENU_OPTION } from './actionType';

export function switchMenuOption(selectedKeys) {
    return {
        type: CHANGE_MENU_OPTION,
        selectedKeys
    }
}
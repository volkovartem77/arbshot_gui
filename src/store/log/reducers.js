import {FETCH_GENERAL_LOG, SET_AUTO_REFRESH_LOG} from "./actions";

const defaultState = {
    general_log: [],
    auto_refresh_log: true,
};

export const LogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_GENERAL_LOG:
            return { ...state, general_log: action.payload, refresh_log_button_disabled: false };
        case SET_AUTO_REFRESH_LOG:
            return { ...state, auto_refresh_log: action.payload}
        default:
            return state;
    }
};
import {DISABLE_REFRESH_LOG_BUTTON, FETCH_GENERAL_LOG} from "./actions";

const defaultState = {
    general_log: [],
    refresh_log_button_disabled: false,
};

export const LogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_GENERAL_LOG:
            return { ...state, general_log: action.payload, refresh_log_button_disabled: false };
        case DISABLE_REFRESH_LOG_BUTTON:
            return { ...state, refresh_log_button_disabled: action.payload };
        default:
            return state;
    }
};
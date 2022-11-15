import {FETCH_GENERAL_LOG} from "./actions";

const defaultState = {
    general_log: []
};

export const LogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_GENERAL_LOG:
            return { ...state, general_log: action.payload };
        default:
            return state;
    }
};
import {FETCH_CLEAR_HISTORY_SUCCESS} from "./actions";
import {FETCH_HISTORY_SUCCESS} from "./actions";

const defaultState = {
    history: {},
    success: true,
};

export const fetchHistoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_HISTORY_SUCCESS:
            return { ...state, history: action.payload.history };
        case FETCH_CLEAR_HISTORY_SUCCESS:
            return { ...state, result: action.payload };
        default:
            return state;
    }
};
import {SET_BOT_STATUS_PENDING, FETCH_BOT_STATUS_SUCCESS} from "./actions";

const defaultState = {
    bot_status: {"bot_status": "Stopped", "error": ""}
};

export const fetchBotStatusReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_BOT_STATUS_SUCCESS:
            return { ...state, bot_status: action.payload };
        case SET_BOT_STATUS_PENDING:
            return { ...state, bot_status: action.payload };
        default:
            return state;
    }
};
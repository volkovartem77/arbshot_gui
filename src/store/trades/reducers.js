import {FETCH_TRADES_SUCCESS, FETCH_CLEAR_TRADES_SUCCESS, SET_PAGE, SET_ROWS_PER_PAGE} from "./actions";

const defaultState = {
    trades: [],
    success: true,
    page: 0,
    rows_per_page: 10,
};

export const fetchTradesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_TRADES_SUCCESS:
            return { ...state, trades: action.payload.trades };
        case FETCH_CLEAR_TRADES_SUCCESS:
            return { ...state, result: action.payload };
        case SET_PAGE:
            return { ...state, page: action.payload };
        case SET_ROWS_PER_PAGE:
            return { ...state, rows_per_page: action.payload };
        default:
            return state;
    }
};
import {
    FETCH_BALANCE_SUCCESS
} from "./actions";

const defaultState = {
    balance: {"balance":{"USDT":0.0,"BTC":0.0}},
};

export const fetchBalanceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_BALANCE_SUCCESS:
            return { ...state, balance: action.payload };
        default:
            return state;
    }
};
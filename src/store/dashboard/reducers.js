import {
    FETCH_BALANCE_SUCCESS,
    FETCH_SUPERVISOR_PROCESSES_SUCCESS
} from "./actions";

const defaultState = {
    balance: {"balance":{"USDT":0.0,"BTC":0.0}},
    supervisor_processes: [],
};

export const fetchDashboardReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_BALANCE_SUCCESS:
            return { ...state, balance: action.payload };
        case FETCH_SUPERVISOR_PROCESSES_SUCCESS:
            return { ...state, supervisor_processes: action.payload.supervisor_processes };
        default:
            return state;
    }
};
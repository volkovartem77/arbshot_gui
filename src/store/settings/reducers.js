import {
    FETCH_SETTINGS_SUCCESS,
    SET_AMOUNT_BTC_LOCK,
    SET_API_KEY,
    SET_API_SECRET,
    SET_APPLY_BUTTON_STATUS,
    SET_BACKWARD,
    SET_BTC_HOLD_PRICE,
    SET_FORWARD,
    SET_MIN_DIFFERENCE,
    SET_ORDER_AMOUNT_PRC,
    SET_RECV_WINDOW,
    SET_TAKER_FEE,
    SET_TRADING,
} from "./actions";

const defaultState = {
    api_key: "",
    api_secret: "",
    taker_fee: 0.1,
    min_difference: 0.25,
    order_amount_prc: 100,
    amount_btc_lock: 0.0111,
    btc_hold_price: 16100,
    recv_window: 15,
    forward: false,
    backward: false,
    trading: false,
    apply_button_status: false,
};

export const fetchSettingsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_SETTINGS_SUCCESS:
            return { ...state,
                api_key: action.payload.api_key,
                api_secret: action.payload.api_secret,
                taker_fee: action.payload.taker_fee,
                min_difference: action.payload.min_difference,
                order_amount_prc: action.payload.order_amount_prc,
                amount_btc_lock: action.payload.amount_btc_lock,
                btc_hold_price: action.payload.btc_hold_price,
                recv_window: action.payload.recv_window,
                forward: action.payload.forward,
                backward: action.payload.backward,
                trading: action.payload.trading,
            };
        case SET_API_KEY:
            return { ...state, api_key: action.payload };
        case SET_API_SECRET:
            return { ...state, api_secret: action.payload };
        case SET_TAKER_FEE:
            return { ...state, taker_fee: action.payload };
        case SET_MIN_DIFFERENCE:
            return { ...state, min_difference: action.payload };
        case SET_ORDER_AMOUNT_PRC:
            return { ...state, order_amount_prc: action.payload };
        case SET_AMOUNT_BTC_LOCK:
            return { ...state, amount_btc_lock: action.payload };
        case SET_BTC_HOLD_PRICE:
            return { ...state, btc_hold_price: action.payload };
        case SET_RECV_WINDOW:
            return { ...state, recv_window: action.payload };
        case SET_FORWARD:
            return { ...state, forward: action.payload };
        case SET_BACKWARD:
            return { ...state, backward: action.payload };
        case SET_TRADING:
            return { ...state, trading: action.payload };
        case SET_APPLY_BUTTON_STATUS:
            return { ...state, apply_button_status: action.payload };
        default:
            return state;
    }
};
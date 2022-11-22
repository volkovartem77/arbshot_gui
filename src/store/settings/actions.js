export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS'
export const SET_API_KEY = 'SET_API_KEY'
export const SET_API_SECRET = 'SET_API_SECRET'
export const SET_TAKER_FEE = 'SET_TAKER_FEE'
export const SET_MIN_DIFFERENCE =' SET_MIN_DIFFERENCE'
export const SET_ORDER_AMOUNT_PRC = 'SET_ORDER_AMOUNT_PRC'
export const SET_AMOUNT_BTC_LOCK = 'SET_AMOUNT_BTC_LOCK'
export const SET_BTC_HOLD_PRICE = 'SET_BTC_HOLD_PRICE'
export const SET_RECV_WINDOW = 'SET_RECV_WINDOW'
export const SET_FORWARD = 'SET_FORWARD'
export const SET_BACKWARD = 'SET_BACKWARD'
export const SET_TRADING = 'SET_TRADING'
export const SET_APPLY_BUTTON_STATUS = 'SET_APPLY_BUTTON_STATUS'

export const fetchSettingsSuccess = (settings) => {
    return {
        type: FETCH_SETTINGS_SUCCESS,
        payload: settings["preferences"]
    }
}

export const setAPIKey = (api_key) => {
    return {
        type: SET_API_KEY,
        payload: api_key
    }
}

export const setAPISecret = (api_secret) => {
    return {
        type: SET_API_SECRET,
        payload: api_secret
    }
}

export const setTakerFee = (taker_fee) => {
    return {
        type: SET_TAKER_FEE,
        payload: taker_fee
    }
}

export const setMinDifference = (min_difference) => {
    return {
        type: SET_MIN_DIFFERENCE,
        payload: min_difference
    }
}

export const setOrderAmountPrc = (order_amount_prc) => {
    return {
        type: SET_ORDER_AMOUNT_PRC,
        payload: order_amount_prc
    }
}

export const setAmountBTCLock = (amount_btc_lock) => {
    return {
        type: SET_AMOUNT_BTC_LOCK,
        payload: amount_btc_lock
    }
}

export const setBTCHoldPrice = (btc_hold_price) => {
    return {
        type: SET_BTC_HOLD_PRICE,
        payload: btc_hold_price
    }
}

export const setRecvWindow = (recv_window) => {
    return {
        type: SET_RECV_WINDOW,
        payload: recv_window
    }
}

export const setForward = (forward) => {
    return {
        type: SET_FORWARD,
        payload: forward
    }
}

export const setBackward = (backward) => {
    return {
        type: SET_BACKWARD,
        payload: backward
    }
}

export const setTrading = (trading) => {
    return {
        type: SET_TRADING,
        payload: trading
    }
}

export const setApplyButtonStatus = (status) => {
    return {
        type: SET_APPLY_BUTTON_STATUS,
        payload: status
    }
}

export const fetchTradingSettings = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(settings => dispatch(fetchSettingsSuccess(settings)))
    }
}

export const sendTradingSettings = (url, data) => {
    return (dispatch) => {
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(settings => dispatch(fetchSettingsSuccess(settings)))
    }
}

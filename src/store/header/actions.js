export const FETCH_BOT_STATUS_SUCCESS = 'FETCH_BOT_STATUS_SUCCESS'
export const SET_BOT_STATUS_PENDING = 'SET_BOT_STATUS_PENDING'

export const fetchBotStatusSuccess = (bot_status) => {
    return {
        type: FETCH_BOT_STATUS_SUCCESS,
        payload: bot_status
    }
}

export const setBotStatusPending = () => {
    return {
        type: SET_BOT_STATUS_PENDING,
        payload: {"bot_status": "Pending", "error": ""}
    }
}

export const fetchBotStatus = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(bot_status => dispatch(fetchBotStatusSuccess(bot_status)))
    }
}

export const startStopBot = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(bot_status => dispatch(fetchBotStatusSuccess(bot_status)))
    }
}

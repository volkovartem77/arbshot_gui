export const FETCH_CLEAR_HISTORY_SUCCESS = 'FETCH_CLEAR_HISTORY_SUCCESS'
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS'

export const fetchHistorySuccess = (history) => {
    return {
        type: FETCH_HISTORY_SUCCESS,
        payload: history
    }
}

export const fetchHistory = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(history => dispatch(fetchHistorySuccess(history)))
    }
}

export const sendClearHistory = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(history => dispatch(fetchHistorySuccess(history)))
    }
}
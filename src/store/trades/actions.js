export const FETCH_CLEAR_TRADES_SUCCESS = 'FETCH_CLEAR_TRADES_SUCCESS'
export const FETCH_TRADES_SUCCESS = 'FETCH_TRADES_SUCCESS'
export const SET_PAGE = 'SET_PAGE'
export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE'

export const fetchTradesSuccess = (trades) => {
    return {
        type: FETCH_TRADES_SUCCESS,
        payload: trades
    }
}

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        payload: page
    }
}

export const setRowsPerPage = (value) => {
    return {
        type: SET_ROWS_PER_PAGE,
        payload: value
    }
}

export const fetchTrades = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(trades => dispatch(fetchTradesSuccess(trades)))
    }
}

export const sendClearTrades = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(trades => dispatch(fetchTradesSuccess(trades)))
    }
}
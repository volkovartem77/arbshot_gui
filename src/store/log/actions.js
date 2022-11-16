export const FETCH_GENERAL_LOG = 'FETCH_GENERAL_LOG'
export const SET_AUTO_REFRESH_LOG = 'SET_AUTO_REFRESH_LOG'

export const fetchGeneralLogSuccess = (log_lines) => {
    return {
        type: FETCH_GENERAL_LOG,
        payload: log_lines
    }
}

export const setAutoRefreshLog = (value) => {
    return {
        type: SET_AUTO_REFRESH_LOG,
        payload: value
    }
}

export const fetchGeneralLog = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(log_lines => dispatch(fetchGeneralLogSuccess(log_lines['log'])))
    }
}
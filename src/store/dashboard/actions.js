export const FETCH_BALANCE_SUCCESS = 'FETCH_BALANCE_SUCCESS'
export const FETCH_SUPERVISOR_PROCESSES_SUCCESS = 'FETCH_SUPERVISOR_PROCESSES_SUCCESS'

export const fetchBalanceSuccess = (balance) => {
    return {
        type: FETCH_BALANCE_SUCCESS,
        payload: balance
    }
}

export const fetchSupervisorProcessesSuccess = (supervisor_processes) => {
    return {
        type: FETCH_SUPERVISOR_PROCESSES_SUCCESS,
        payload: supervisor_processes
    }
}

export const fetchSupervisorProcesses = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(supervisor_processes => dispatch(fetchSupervisorProcessesSuccess(supervisor_processes)))
    }
}


export const fetchBalance = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(balance => dispatch(fetchBalanceSuccess(balance)))
    }
}

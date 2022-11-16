export const FETCH_BALANCE_SUCCESS = 'FETCH_BALANCE_SUCCESS'


export const fetchBalanceSuccess = (balance) => {
    return {
        type: FETCH_BALANCE_SUCCESS,
        payload: balance
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
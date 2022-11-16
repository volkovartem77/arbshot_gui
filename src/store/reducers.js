import {combineReducers} from 'redux';
import {LogReducer} from "./log/reducers";
import {fetchBotStatusReducer} from "./header/reducers";
import {fetchBalanceReducer} from "./balance/reducers";

export default combineReducers({
    header: fetchBotStatusReducer,
    balance: fetchBalanceReducer,
    log: LogReducer
});

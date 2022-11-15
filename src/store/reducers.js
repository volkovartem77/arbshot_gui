import {combineReducers} from 'redux';
import {LogReducer} from "./log/reducers";
import {fetchBotStatusReducer} from "./header/reducers";

export default combineReducers({
    header: fetchBotStatusReducer,
    log: LogReducer
});

import {combineReducers} from 'redux';
import {LogReducer} from "./log/reducers";
import {fetchBotStatusReducer} from "./header/reducers";
import {fetchDashboardReducer} from "./dashboard/reducers";
import {fetchHistoryReducer} from "./history/reducers";
import {fetchSettingsReducer} from "./settings/reducers";

export default combineReducers({
    header: fetchBotStatusReducer,
    dashboard: fetchDashboardReducer,
    history: fetchHistoryReducer,
    settings: fetchSettingsReducer,
    log: LogReducer
});

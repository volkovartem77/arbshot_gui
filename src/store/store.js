import {applyMiddleware, legacy_createStore as createStore} from "redux";
import reducer from "./reducers";
import thunk from 'redux-thunk'


export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}
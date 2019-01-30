import { combineReducers } from 'redux';
import { createStore } from 'redux';
import loginData from './loginData';

const reducer = combineReducers({
    loginData,
});

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
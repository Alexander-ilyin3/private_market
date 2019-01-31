import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import loginData from './loginData';

const reducer = combineReducers({
    loginData,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
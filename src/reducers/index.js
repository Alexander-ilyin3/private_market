import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import loginData from './loginData';
import isLoading from './isLoading';

const reducer = combineReducers({
    loginData,
    isLoading,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
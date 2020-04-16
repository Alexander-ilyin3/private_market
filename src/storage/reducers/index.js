import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import loginData from './loginData'
import isLoading from './isLoading'
import userData from './userData'
import menuItem from './menu'

const reducer = combineReducers({
  loginData,
  isLoading,
  userData,
  menuItem,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

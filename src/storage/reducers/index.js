import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import loginData from './loginData'
import isLoading from './isLoading'
import userData from './userData'
import menuItem from './menu'
import productCategories from './productCategories'
import { productSearchAutocomplete, productsData, productInfo } from './products'

const reducer = combineReducers({
  loginData,
  isLoading,
  userData,
  menuItem,
  productCategories,
  productSearchAutocomplete,
  productsData,
  productInfo,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

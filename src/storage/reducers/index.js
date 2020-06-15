import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { LOG_OUT } from '../constants'
import loginData from './loginData'
import isLoading from './isLoading'
import userData from './userData'
import menuItem from './menu'
import productCategories from './productCategories'
import { productSearchAutocomplete, productsData, productInfo } from './products'
import cart from './cart'
import snackInfo from './snack'
import userListInfo from './user'
import { orderList } from './order'

const reducer = combineReducers({
  loginData,
  isLoading,
  userData,
  menuItem,
  productCategories,
  productSearchAutocomplete,
  productsData,
  productInfo,
  cart,
  snackInfo,
  userListInfo,
  orderList,
})

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = { loginData: loginData(state.loginData, action) }
  }

  return reducer(state, action)
}
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

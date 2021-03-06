import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { LOG_OUT } from '../constants'
import loginData from './loginData'
import userData from './userData'
import menuItem from './menu'
import productCategories from './productCategories'
import { productSearchAutocomplete, productsData, productInfo } from './products'
import cart from './cart'
import snackInfo from './snack'
import userListInfo from './user'
import { orderList, orderDetails } from './order'
import userTokenDialog from './userTokenDialog'
import deliveryMethods from './deliveryMethods'
import paymentMethods from './paymentMethods'
import userDebth from './userDebt'

const reducer = combineReducers({
  loginData,
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
  userTokenDialog,
  deliveryMethods,
  paymentMethods,
  orderDetails,
  userDebth,
})

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = { loginData: loginData(state.loginData, action) }
  }

  return reducer(state, action)
}
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

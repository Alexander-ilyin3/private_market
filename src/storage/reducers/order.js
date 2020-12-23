import { SET_ORDER_LIST, SET_ORDER_DETAILS } from 'storage/constants/order.constants'

const defaultState = {
  orders: [],
  config: {},
}

export const orderList = (state = defaultState, { type, payload }) => {
  if (type === SET_ORDER_LIST) {
    return payload
  }
  return state
}

export const orderDetails = (state = { }, { type, payload }) => {
  if (type === SET_ORDER_DETAILS) {
    return payload
  }
  return state
}

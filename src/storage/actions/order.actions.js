import { SET_ORDER_LIST, SET_ORDER_DETAILS } from 'storage/constants/order.constants'

export const setOrderList = payload => ({
  type: SET_ORDER_LIST,
  payload,
})

export const setOrderDetails = payload => ({
  type: SET_ORDER_DETAILS,
  payload,
})

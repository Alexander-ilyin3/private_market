import { SET_ORDER_LIST } from 'storage/constants/order.constants'

export const setOrderList = payload => ({
  type: SET_ORDER_LIST,
  payload,
})

import { SET_ORDER_LIST } from 'storage/constants/order.constants'

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

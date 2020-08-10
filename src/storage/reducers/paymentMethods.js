import { SET_PAYMENT_METHODS } from 'storage/constants/paymentMethods.constants'

export default function (state = [], action) {
  if (action.type === SET_PAYMENT_METHODS) {
    return action.payload
  }
  return state
}

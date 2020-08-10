import { SET_DELIVERY_METHODS } from 'storage/constants/deliveryMethods.constants'

export default function (state = [], action) {
  if (action.type === SET_DELIVERY_METHODS) {
    return action.payload
  }
  return state
}

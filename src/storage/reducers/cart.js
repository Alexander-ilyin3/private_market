import { UPDATE_CART } from 'storage/constants/cart.constants'

const initialState = []

export default function isLoading(state = initialState, action) {
  if (action.type === UPDATE_CART) {
    return action.payload
  }
  return state
}

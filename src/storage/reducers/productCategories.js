import { SET_PRODUCT_CATEGORIES } from '../constants/productCategories.constants'

export default function productCategories(state = 0, action) {
  if (action.type === SET_PRODUCT_CATEGORIES) {
    return action.payload
  }
  return state
}

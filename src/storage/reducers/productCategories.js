import { SET_PRODUCT_CATEGORIES } from '../constants/productCategories.constants'

const defaultState = ({
  categories: [],
  config: {
    page: 0,
    limit: 10,
    count: 0,
  },
})

export default function productCategories(state = defaultState, action) {
  if (action.type === SET_PRODUCT_CATEGORIES) {
    return action.payload
  }
  return state
}

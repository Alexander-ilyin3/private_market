import { SET_PRODUCT_CATEGORIES } from '../constants/productCategories.constants'

const setProductCategoriesAction = payload => ({
  type: SET_PRODUCT_CATEGORIES,
  payload,
})

export { setProductCategoriesAction }

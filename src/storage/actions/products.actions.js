import { SET_SEARCH_AUTOCOMPLETE, SET_PRODUCTS } from '../constants/products.constants'

export const setProductSearchAutocompleteAction = payload => ({
  type: SET_SEARCH_AUTOCOMPLETE,
  payload,
})

export const setProducts = payload => ({
  type: SET_PRODUCTS,
  payload,
})

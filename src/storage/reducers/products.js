import { SET_SEARCH_AUTOCOMPLETE, SET_PRODUCTS, SET_PRODUCT } from '../constants/products.constants'


export const productSearchAutocomplete = (state = [], action) => {
  if (action.type === SET_SEARCH_AUTOCOMPLETE) {
    return action.payload
  }
  return state
}

const productsDefaultState = {
  products: [],
  vendors: [],
  config: {
    page: 0,
    limit: 10,
    count: 0,
    maxAmount: 0,
    vendor: 0,
    searchText: '',
  },
}

export const productsData = (state = productsDefaultState, action) => {
  if (action.type === SET_PRODUCTS) {
    return action.payload
  }
  return state
}


const singleProductInitialState = {
  error: null,
  data: {},
}

export const productInfo = (state = singleProductInitialState, action) => {
  if (action.type === SET_PRODUCT) {
    return {
      error: null,
      ...action.payload,
    }
  }
  return state
}

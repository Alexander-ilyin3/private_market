import {
  apiCategoriesPath,
  apiProductSearchAutocompletePath,
  apiProductsPath,
  apiProductDetailsPath,
} from 'config/apiPath'
import { setProductCategoriesAction } from 'storage/actions/productCategories.action'

import { setProductSearchAutocompleteAction, setProducts, setProduct } from 'storage/actions/products.actions'

import { convertToCamelcase } from '../functions'

import instance from './axiosProvider'

export const getProductCategories = ({ page, limit }) => async (dispatch) => {
  try {
    const res = await instance.get(apiCategoriesPath, { params: { page, limit } })

    if (res) {
      const { data = {} } = res || {}
      const { success = false, categories = [], config = {} } = data
      const { page } = config
      if (success) {
        dispatch(setProductCategoriesAction(convertToCamelcase({
          categories,
          config: { ...config, page: page - 1 },
        })))
      }
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message = {} } = data
    if (typeof message === 'string') {
      dispatch(setProductCategoriesAction(convertToCamelcase({ err: message })))
    }
    dispatch(setProductCategoriesAction(convertToCamelcase({ err: 'Failed' })))
  }
}

export const getSearchAutocomplete = search_text => async (dispatch) => {
  try {
    const res = await instance.get(apiProductSearchAutocompletePath, { params: { search_text } })

    if (res) {
      const { data = {} } = res || {}
      const { success = false, search_list } = data
      if (success) {
        dispatch(setProductSearchAutocompleteAction(search_list))
      }
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message = {} } = data
    if (typeof message === 'string') {
      throw new Error(message)
    }
    throw new Error('Failed')
  }
}

export const getProductList = config => async (dispatch) => {
  try {
    const res = await instance.get(apiProductsPath, { params: config })

    if (res) {
      const { data = {} } = res || {}
      const {
        success = false,
        products = [],
        config = {},
        vendors,
      } = data

      const { page } = config
      if (success) {
        dispatch(setProducts({
          products,
          vendors,
          config: {
            ...config,
            page: page - 1,
            searchText: config.search_text,
          },
        }))
      }
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message = {} } = data
    if (typeof message === 'string') {
      dispatch(setProductCategoriesAction(convertToCamelcase({ err: message })))
    }
    dispatch(setProductCategoriesAction(convertToCamelcase({ err: 'Failed' })))
  }
}

export const getProductDetails = id => async (dispatch) => {
  try {
    const res = await instance.get(apiProductDetailsPath.replace(':id', id))
    if (res) {
      const { data = {} } = res || {}
      const {
        success = false,
        product = {},
        message,
      } = data
      if (success) {
        return dispatch(setProduct({
          error: null,
          data: product,
        }))
      }
      return dispatch(setProduct({
        error: message || 'Failed',
      }))
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message = {} } = data
    if (typeof message === 'string') {
      dispatch(setProduct({ error: message }))
    }
    dispatch(setProduct({ error: 'Failed' }))
  }
}

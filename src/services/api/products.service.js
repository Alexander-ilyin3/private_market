import {
  apiCategoriesPath,
  apiProductSearchAutocompletePath,
  apiProductsPath,
} from 'config/apiPath'
import { setProductCategoriesAction } from 'storage/actions/productCategories.action'

import { setProductSearchAutocompleteAction, setProducts } from 'storage/actions/products.actions'

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

export const getSearchAutocomplete = searchText => async (dispatch) => {
  // setTimeout(() => {
  //   const filtered = new Set(mockedProducts.map(product => product[3]).filter(name => name.toUpperCase().indexOf(searchText.toUpperCase()) > -1).slice(0, 5))

  //   dispatch(setProductSearchAutocompleteAction([...filtered]))
  // }, 1000)

  // try {
  //   const res = await instance.get(apiProductSearchAutocompletePath, { text: searchText })

  //   if (res) {
  //     const { data = {} } = res || {}
  //     const { success = false, searchList } = data
  //     if (success) {
  //       dispatch(setProductSearchAutocompleteAction(searchList))
  //     }
  //   }
  // } catch (err) {
  //   const { response = {} } = err || {}
  //   const { data = {} } = response
  //   const { message = {} } = data
  //   if (typeof message === 'string') {
  //     throw new Error(message)
  //   }
  //   throw new Error('Failed')
  // }
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

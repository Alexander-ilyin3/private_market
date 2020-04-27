import {
  apiCategoriesPath,
} from 'config/apiPath'
import { setProductCategoriesAction } from 'storage/actions/productCategories.action'
import { loadingStart, loadingStop } from 'storage/actions/loading.actions'

import { convertToCamelcase } from '../functions'

import instance from './axiosProvider'


const mockedData = [
  [1, 'Продуктики', 'Другие продуктики'],
  [2, 'Продуктики', 'Другие продуктики'],
  [3, 'Продуктики', 'Другие продуктики'],
  [4, 'Продуктики', 'Другие '],
  [5, 'Продукт', 'Другие продуктики'],
  [6, 'Продуктики', 'Другие продуктики'],
  [7, 'Продуктики', 'Другие продуктики'],
  [8, 'Продуктики', 'Другие продуктики'],
  [9, 'Продуктasfasdfики', 'Другие проasdfдуктики'],
  [10, 'Продуasdfasdfктики', 'Другие продуктики'],
  [11, 'Продуктиasdfasdfки', 'Другие продуктики'],
  [12, 'Прктики', 'Другие продукти'],
  [13, 'Продуктики', 'Другие продуктики'],
  [14, 'Продуки', 'Другие продукки'],
  [15, 'дуктики', 'Другие прики'],
  [16, 'Продуки', 'Другие продуктики'],
  [17, 'тики', 'Другие '],
  [18, 'Продуктики', 'Другие продуктики'],
  [19, 'Продуктики', 'Другие продуктики'],
]


export const getProductCategories = ({ page, rowsPerPage }) => async (dispatch) => {
  dispatch(loadingStart())

  setTimeout(() => {
    dispatch(setProductCategoriesAction(convertToCamelcase({
      categories: mockedData.slice(rowsPerPage * page, page * rowsPerPage + rowsPerPage),
      config: { page, rowsPerPage, count: mockedData.length },
    })))
    dispatch(loadingStop())
  }, 1000)

  // try {
  //   const res = await instance.get(apiCategoriesPath, { params })

  //   if (res) {
  //     const { data = {} } = res || {}
  //     const { success = false, categories = {}, customer } = data
  //     if (success) {
  //       dispatch(setProductCategoriesAction(convertToCamelcase({ categories, })))
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

import {
  apiCategoriesPath,
} from 'config/apiPath'
import { setProductCategoriesAction } from 'storage/actions/productCategories.action'
import { loadingStart, loadingStop } from 'storage/actions/loading.actions'

import { convertToCamelcase } from '../functions'

import instance from './axiosProvider'


const mockedData = [
  [19, 1, 'Продуктики', 'Другие продуктики'],
  [18, 2, 'Продуктики', 'Другие продуктики'],
  [17, 3, 'Продуктики', 'Другие продуктики'],
  [16, 4, 'Продуктики', 'Другие '],
  [15, 5, 'Продукт', 'Другие продуктики'],
  [14, 6, 'Продуктики', 'Другие продуктики'],
  [13, 7, 'Продуктики', 'Другие продуктики'],
  [12, 8, 'Продуктики', 'Другие продуктики'],
  [11, 9, 'Продуктasfasdfики', 'Другие проasdfдуктики'],
  [10, 10, 'Продуasdfasdfктики', 'Другие продуктики'],
  [9, 11, 'Продуктиasdfasdfки', 'Другие продуктики'],
  [8, 12, 'Прктики', 'Другие продукти'],
  [7, 13, 'Продуктики', 'Другие продуктики'],
  [6, 14, 'Продуки', 'Другие продукки'],
  [5, 15, 'дуктики', 'Другие прики'],
  [4, 16, 'Продуки', 'Другие продуктики'],
  [3, 17, 'тики', 'Другие '],
  [4, 18, 'Продуктики', 'Другие продуктики'],
  [3, 19, 'Продуктики', 'Другие продуктики'],
]


export const getProductCategories = ({ page, limit }) => async (dispatch) => {
  dispatch(loadingStart())

  setTimeout(() => {
    dispatch(setProductCategoriesAction(convertToCamelcase({
      categories: mockedData.slice(limit * page, page * limit + limit),
      config: { page, limit, count: mockedData.length },
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

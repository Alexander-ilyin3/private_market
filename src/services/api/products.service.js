import {
  apiCategoriesPath,
  apiProductSearchAutocompletePath,
} from 'config/apiPath'
import { setProductCategoriesAction } from 'storage/actions/productCategories.action'
import { loadingStart, loadingStop } from 'storage/actions/loading.actions'
import { setProductSearchAutocompleteAction, setProducts } from 'storage/actions/products.actions'

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

const mockedProducts = [
  [1, '110', 'http://123', 'Другой', 'Продуктики', 'Вендор1', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'http://123', 'Название', 'Продуктики', 'Вендор1', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор2', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор2', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор3', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор3', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор4', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор4', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор5', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор6', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор6', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор6', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор7', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'http://123', 'Другой', 'Продуктики', 'Вендор7', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор7', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор8', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор9', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор9', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор9', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор9', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор9', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор10', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор10', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор10', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор11', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'http://123', 'Продукт', 'Продуктики', 'Вендор11', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
]

export const getProductCategories = ({ page, limit }) => async (dispatch) => {
  dispatch(loadingStart())

  setTimeout(() => {
    const newRow = [...mockedData[mockedData.length - 1]]
    newRow[1] += 1
    mockedData.push(newRow)
    dispatch(setProductCategoriesAction(convertToCamelcase({
      categories: mockedData.slice(limit * page, page * limit + limit),
      config: { page: 1, limit, count: mockedData.length },
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

export const getSearchAutocomplete = searchText => async (dispatch) => {
  setTimeout(() => {
    const filtered = new Set(mockedProducts.map(product => product[3]).filter(name => name.toUpperCase().indexOf(searchText.toUpperCase()) > -1).slice(0, 5))

    dispatch(setProductSearchAutocompleteAction([...filtered]))
  }, 1000)

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
  dispatch(loadingStart())
  const {
    page,
    limit,
    searchText,
    maxAmount,
    selectedVendors,
  } = config

  setTimeout(() => {
    const products = mockedProducts
      .filter(product => ((maxAmount > 0) ? product[11] < maxAmount : true))
      .filter(product => (searchText ? product[3].toUpperCase().indexOf(searchText.toUpperCase()) > -1 : true))
      .filter(product => ((selectedVendors && selectedVendors.length > 0) ? [...selectedVendors].includes(product[5]) : true))

    const uniqueVendors = new Set(mockedProducts.map(product => product[5]))
    const sliced = products.slice(limit * page, page * limit + limit)
    dispatch(setProducts({
      products: sliced,
      config: {
        ...config,
        count: products.length,
        vendors: [...uniqueVendors],
        selectedVendors,
      },
    }))
    dispatch(loadingStop())
  }, 1000)

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

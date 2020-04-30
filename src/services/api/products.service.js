import {
  apiCategoriesPath,
  apiProductSearchAutocompletePath,
} from 'config/apiPath'
import { setProductCategoriesAction } from 'storage/actions/productCategories.action'
import { loadingStart, loadingStop } from 'storage/actions/loading.actions'
import { setProductSearchAutocompleteAction, setProducts } from 'storage/actions/products.actions'

import { convertToCamelcase } from '../functions'

import instance from './axiosProvider'

const mockedProducts = [
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Другой', 'Продуктики', 'Вендор1', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Название', 'Продуктики', 'Вендор1', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор2', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор2', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор3', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор3', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор4', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор4', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор5', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор6', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 250],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор6', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор6', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор7', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Другой', 'Продуктики', 'Вендор7', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор7', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор8', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор9', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор9', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 8000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор9', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор9', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор9', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор10', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор10', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор10', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор11', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
  [1, '110', 'https://ktonanovenkogo.ru/image/tovar-chto-takoe-korobka.jpg', 'Продукт', 'Продуктики', 'Вендор11', '12', 'Баркод', 'Объем', 'Вес', 'УКТЗ', 10000],
]

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

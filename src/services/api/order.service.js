import {
  apiCheckoutOrderPath,
  apiOrders,
} from 'config/apiPath'
import { showSnack } from 'storage/actions/snack.actions'
import { setOrderList } from 'storage/actions/order.actions'

import instance from './axiosProvider'


export const checkout = async (orderData) => {
  try {
    const res = await instance.post(apiCheckoutOrderPath, orderData)
    const { success, message } = res.data
    if (success) {
      showSnack({
        variant: 'success',
        message,
      })
    } else {
      showSnack({
        variant: 'error',
        message,
      })
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message } = data
    let error = ''
    if (typeof message === 'string') {
      error = message
    } else {
      error = 'Oops, something went wrong'
    }
    showSnack({
      variant: 'error',
      message: error,
    })
  }
}

export const getOrderList = params => async (reduce) => {
  try {
    const res = await instance.get(apiOrders, { params })
    const {
      success,
      message,
      orders,
      config,
    } = res.data
    if (success) {
      reduce(setOrderList({ orders, config }))
    } else {
      showSnack({
        variant: 'error',
        message,
      })
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message } = data
    let error = ''
    if (typeof message === 'string') {
      error = message
    } else {
      error = 'Oops, something went wrong'
    }
    showSnack({
      variant: 'error',
      message: error,
    })
  }
}

import {
  apiCheckoutOrderPath,
  apiOrders,
  apiDeliveryTypeList,
  apiDeliveryCitiesList,
  apiDeliveryWarehousList,
  apiPaymentMethodList,
} from 'config/apiPath'
import { showSnack } from 'storage/actions/snack.actions'
import { setOrderList } from 'storage/actions/order.actions'
import { setDeliveryMethods } from 'storage/actions/deliveryMethods.actions'
import { setPaymentMethods } from 'storage/actions/paymentMethod.actions'

import instance from './axiosProvider'


export const checkout = async (orderData) => {
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

export const cityAutocomplete = async (name) => {
  const res = await instance.get(apiDeliveryCitiesList, { params: { name } })
  const { cities } = res.data
  return cities
}

export const warehouseAutocomplete = async (city_ref) => {
  const res = await instance.get(apiDeliveryWarehousList, { params: { city_ref } })
  const { warehouses } = res.data
  return warehouses
}

export const getDeliveryMethods = async (dispatch) => {
  const res = await instance.get(apiDeliveryTypeList)
  const { delivery } = res.data
  dispatch(setDeliveryMethods(delivery))
}

export const getPaymentMethods = async (dispatch) => {
  const res = await instance.get(apiPaymentMethodList)
  const { payments } = res.data
  dispatch(setPaymentMethods(payments))
}

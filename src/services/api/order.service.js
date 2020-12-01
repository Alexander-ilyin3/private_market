import {
  apiCheckoutOrderPath,
  apiOrders,
  apiDeliveryTypeList,
  apiDeliveryCitiesList,
  apiDeliveryWarehousList,
  apiPaymentMethodList,
  apiOrderDetails,
  apiDeliveryStreetsPath,
} from 'config/apiPath'
import { showSnack } from 'storage/actions/snack.actions'
import { setOrderList, setOrderDetails } from 'storage/actions/order.actions'
import { setDeliveryMethods } from 'storage/actions/deliveryMethods.actions'
import { setPaymentMethods } from 'storage/actions/paymentMethod.actions'
import { clearCart } from 'services/cart/cartService'

import instance from './axiosProvider'


export const checkout = async (orderData) => {
  const res = await instance.post(apiCheckoutOrderPath, orderData)
  const { success, message } = res.data
  if (success) {
    showSnack({
      variant: 'success',
      message,
    })
    clearCart()
    return true
  }
  showSnack({
    variant: 'error',
    message,
  })
  return false
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
  return cities.slice(0, 50)
}

export const warehouseAutocomplete = async (city_ref) => {
  const res = await instance.get(apiDeliveryWarehousList, { params: { city_ref } })
  const { warehouses } = res.data
  return warehouses
}

export const streetAutocomplete = async ({ city_ref, search }) => {
  if (!city_ref) return []
  const res = await instance.get(apiDeliveryStreetsPath, { params: { city_ref, search } })
  const { streets } = res.data

  const streetsMock = [
    { ref: '1', name: 'Kashirina' },
    { ref: '2', name: 'Skilna' },
    { ref: '3', name: 'Likarniana' },
    { ref: '4', name: 'Bakulina' },
    { ref: '5', name: 'Naukova' },
    { ref: '6', name: 'Starogorodska' },
    { ref: '7', name: 'Sadova' },
  ]

  return streetsMock
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

export const getOrder = id => async (dispatch) => {
  const res = await instance.get(apiOrderDetails.replace(':id', id))
  const { order } = res.data
  dispatch(setOrderDetails(order || {}))
}

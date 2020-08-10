import { SET_PAYMENT_METHODS } from 'storage/constants/paymentMethods.constants'

export const setDeliveryMethods = paymentMethods => ({
  type: SET_PAYMENT_METHODS,
  payload: paymentMethods,
})

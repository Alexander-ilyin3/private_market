import { SET_DELIVERY_METHODS } from 'storage/constants/deliveryMethods'

export const setDeliveryMethods = deliveryMethods => ({
  type: SET_DELIVERY_METHODS,
  payload: deliveryMethods,
})

import { UPDATE_CART } from 'storage/constants/cart.constants'
import { store } from 'storage'

export const updateCart = (cart) => {
  store.dispatch({
    type: UPDATE_CART,
    payload: cart,
  })
}

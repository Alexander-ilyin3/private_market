import { getProfile } from 'services/api/profile.service'
import { getCartFromStorage } from 'services/cart/cartService'


export const initApp = (dispatch) => {
  dispatch(getProfile())
  getCartFromStorage()
}

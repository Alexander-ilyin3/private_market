import { getProfile } from 'services/api/profile.service'
import { getDebt } from 'services/api/user.service'
import { getCartFromStorage } from 'services/cart/cartService'


export const initApp = (dispatch) => {
  dispatch(getDebt())
  dispatch(getProfile())
  getCartFromStorage()
}

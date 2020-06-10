import { CLOSE_SNACK, OPEN_SNACK } from 'storage/constants/snack.constants'
import { store } from 'storage'

export const hideSnack = () => store.dispatch({ type: CLOSE_SNACK })

export const showSnack = (payload) => {
  // hideSnack()
  store.dispatch({ type: OPEN_SNACK, payload })
}

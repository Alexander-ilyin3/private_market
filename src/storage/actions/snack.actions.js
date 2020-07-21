import { OPEN_SNACK, SLICE_STACK } from 'storage/constants/snack.constants'
import { store } from 'storage'

export const sliceStack = () => {
  store.dispatch({ type: SLICE_STACK })
}

export const showSnack = (payload) => {
  store.dispatch({ type: OPEN_SNACK, payload })
}

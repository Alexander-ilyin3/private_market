import { OPEN_SNACK, SLICE_STACK } from 'storage/constants/snack.constants'

const initialState = []

export default function isLoading(state = initialState, { type, payload }) {
  if (type === OPEN_SNACK) {
    return [
      ...state,
      {
        open: true,
        ...payload,
        key: new Date().getTime(),
      },
    ]
  }
  if (type === SLICE_STACK) {
    return state.slice(1)
  }
  return state
}

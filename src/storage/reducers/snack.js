import { CLOSE_SNACK, OPEN_SNACK } from 'storage/constants/snack.constants'

const initialState = {
  open: false,
}

export default function isLoading(state = initialState, { type, payload }) {
  if (type === OPEN_SNACK) {
    return {
      open: true,
      message: payload.message,
      variant: payload.variant,
    }
  }
  if (type === CLOSE_SNACK) {
    return {
      ...state,
      open: false,
    }
  }
  return state
}

import { CLOSE_TOKEN_DIALOG, OPEN_TOKEN_DIALOG } from 'storage/constants/userTokenDialog.constants'

const defaultState = { open: false, token: '', userId: null }

export default function (state = defaultState, action) {
  if (action.type === CLOSE_TOKEN_DIALOG) {
    return defaultState
  }
  if (action.type === OPEN_TOKEN_DIALOG) {
    return { ...action.payload, open: true }
  }
  return state
}

import { getStorageItem, setStorageItem } from 'services/storage'
import { LOG_IN, LOG_OUT } from '../constants'

const emptyState = {
  isLoggedIn: false,
  token: null,
  error: null,
}

let initialState

if (getStorageItem('appState')) initialState = JSON.parse(getStorageItem('appState'))

export default function loginData(
  state = { ...emptyState, ...initialState } || emptyState, action,
) {
  const { payload = {} } = action
  const { isLoggedIn, token } = payload
  if (action.type === LOG_IN) {
    setStorageItem('appState', JSON.stringify({ isLoggedIn, token }))
    return action.payload
  }
  if (action.type === LOG_OUT) {
    setStorageItem('appState', JSON.stringify(emptyState))
    return emptyState
  }
  return state
}

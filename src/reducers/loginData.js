import { getStorageItem, setStorageItem } from '../services/storage'

const emptyState = {
  isLoggedIn: false,
  token: null,
}

let initialState

if (getStorageItem('appState')) initialState = JSON.parse(getStorageItem('appState'))

export default function loginData(state = initialState || emptyState, action) {
  if (action.type === 'LOG_IN') {
    setStorageItem('appState', JSON.stringify(action.payload))
    return action.payload
  }
  if (action.type === 'LOG_OUT') {
    setStorageItem('appState', JSON.stringify(emptyState))
    return emptyState
  }
  return state
}

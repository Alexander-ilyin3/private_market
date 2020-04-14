
const initialState = false

export default function isLoading(state = initialState, action) {
  if (action.type === 'LOADING_START') {
    return true
  }
  if (action.type === 'LOADING_STOP') {
    return false
  }
  return state
}

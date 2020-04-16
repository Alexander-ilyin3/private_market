import { SELECT_MENU } from '../constants/menu.constants'

export default function menuItem(state = 0, action) {
  if (action.type === SELECT_MENU) {
    return action.payload
  }
  return state
}
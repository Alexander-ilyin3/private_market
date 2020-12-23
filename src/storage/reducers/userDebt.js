import { SET_USER_DEBTH } from 'storage/constants/userDebt.constants'


export default function userData(state = {}, action) {
  if (action.type === SET_USER_DEBTH) {
    return action.payload
  }
  return state
}

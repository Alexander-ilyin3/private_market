import { SET_USER_DEBTH } from 'storage/constants/userDebt.constants'

export const setUserdebt = payload => ({
  type: SET_USER_DEBTH,
  payload,
})

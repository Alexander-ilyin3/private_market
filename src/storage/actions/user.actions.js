import { SET_USR_LIST } from 'storage/constants/user.constants'

export const setUserList = payload => ({
  type: SET_USR_LIST,
  payload,
})

import {
  apiProfilePath,
} from 'config/apiPath'

import { userDataActions } from 'storage/actions'
import { logout } from './login.service'
import { convertToCamelcase } from './functions'
import instance from './axiosProvider'

export const getProfile = () => async (dispatch) => {
  try {
    const res = await instance.get(apiProfilePath)

    if (res) {
      const { data = {} } = res || {}
      const { success = false, customer = {} } = data
      if (success) {
        dispatch(userDataActions.setUserData(convertToCamelcase(customer)))
      }
    }
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      dispatch(logout())
    }
    throw new Error(err)
  }
}

import {
  apiProfilePath,
  apiprofileUpdatePath,
} from 'config/apiPath'

import { userDataActions } from 'storage/actions'
import { logout } from './login.service'
import { convertToCamelcase, convertToSnakecase } from '../functions'
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

export const updateProfile = async (userData) => {
  try {
    console.log(userData)
    const res = await instance.put(apiprofileUpdatePath, convertToSnakecase(userData))
    if (res) {
      return res
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message = {} } = data
    console.log(message)
    if (typeof message === 'string') {
      throw new Error(message)
    }
    if (message.customer_phone) {
      throw new Error(message.customer_phone[0])
    }
    throw new Error('Невозможно обновить профиль')
  }
}

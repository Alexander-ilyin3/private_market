import {
  apiUserListPath,
  apiSetUserStatusPath,
} from 'config/apiPath'
import { showSnack } from 'storage/actions/snack.actions'
import { setUserList } from 'storage/actions/user.actions'
import { store } from 'storage'
import { userListInfo } from 'storage/selectors/user.selector'

import instance from './axiosProvider'


export const getUser = params => async (dispatch) => {
  if (!params) {
    params = userListInfo(store.getState()).config
  }
  try {
    const res = await instance.get(apiUserListPath, { params })
    const {
      success,
      message,
      config,
      customers,
      roles,
    } = res.data
    if (success) {
      dispatch(setUserList({
        config,
        customers,
        roles,
      }))
    } else {
      showSnack({
        variant: 'error',
        message,
      })
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message } = data
    showSnack({
      variant: 'error',
      message,
    })
  }
}

export const setStatus = status => async (dispatch) => {
  try {
    const res = await instance.post(apiSetUserStatusPath, status)
    const {
      success,
      message,
    } = res.data
    if (success) {
      dispatch(getUser())
    } else {
      showSnack({
        variant: 'error',
        message,
      })
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message } = data
    showSnack({
      variant: 'error',
      message,
    })
  }
}

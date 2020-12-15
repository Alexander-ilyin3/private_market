import {
  apiUserListPath,
  apiSetUserStatusPath,
  apiDebtPath,
} from 'config/apiPath'
import { showSnack } from 'storage/actions/snack.actions'
import { setUserList } from 'storage/actions/user.actions'
import { setUserdebt } from 'storage/actions/userDebth.actions'
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
      config,
      customers,
      roles,
    } = res.data
    dispatch(setUserList({
      config,
      customers,
      roles,
    }))
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

export const getDebt = () => async (dispatch) => {
  const res = await instance.get(apiDebtPath)
  const { data } = res
  dispatch(setUserdebt(data))
  if (data && data.length) {
    data.forEach(({ debt, message }) => {
      showSnack({
        message,
        variant: (debt && debt > 0) ? 'warning' : 'info',
      })
    })
  }
}

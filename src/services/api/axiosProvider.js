/* eslint-disable no-prototype-builtins */
import axios from 'axios'
import querystring from 'querystring'
import { store } from 'storage'
import {
  apiProductSearchAutocompletePath,
} from 'config/apiPath'
import { showSnack } from 'storage/actions/snack.actions'
import { logoutAction } from 'storage/actions/login.actions'

import Preloader from 'components/assets/preloader'

import { apiBaseURL } from '../../config/constants'

const { dispatch } = store

const instance = axios.create({
  baseURL: apiBaseURL,
  paramsSerializer(params) {
    return querystring.stringify(params)
  },
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.response.use(
  (res) => {
    Preloader.hide()
    const { success, message } = res.data
    if (res.data.hasOwnProperty('success') && !success) {
      showSnack({
        variant: 'error',
        message,
      })
    }
    return res
  }, (err) => {
    Preloader.hide()
    const { response = {} } = err || {}
    const { data = {}, status } = response
    if (status === 401) {
      dispatch(logoutAction())
    }
    const { message, errors, error } = data
    if (message) {
      showSnack({
        variant: 'error',
        message,
      })
    }
    if (error && typeof error === 'string') {
      showSnack({
        variant: 'error',
        message: error,
      })
    }
    if (errors) {
      Object.keys(errors).forEach((key) => {
        showSnack({
          variant: 'error',
          message: errors[key].join(' '),
        })
      })
    }
    return Promise.reject(err)
  },
)

instance.interceptors.request.use(
  (config) => {
    const { url } = config
    if (url.indexOf(apiProductSearchAutocompletePath) === -1) {
      Preloader.show()
    }
    const token = store.getState().loginData.token
    const updatedConfig = config
    if (token) {
      updatedConfig.headers.Authorization = token
    }

    return {
      ...updatedConfig,
    }
  },
)

export default instance

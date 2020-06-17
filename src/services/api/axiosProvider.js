import axios from 'axios'
import querystring from 'querystring'
import { store, actions } from 'storage'
import {
  apiProductSearchAutocompletePath,
} from 'config/apiPath'
import { showSnack } from 'storage/actions/snack.actions'
import { logoutAction } from 'storage/actions/login.actions'


import { apiBaseURL } from '../../config/constants'

const { dispatch } = store
const { loadingActions } = actions
const { loadingStart, loadingStop } = loadingActions

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
    dispatch(loadingStop())
    return res
  }, (err) => {
    dispatch(loadingStop())
    const { response = {} } = err || {}
    const { data = {}, status } = response
    if (status === 401) {
      dispatch(logoutAction())
    }
    const { message } = data
    showSnack({
      variant: 'error',
      message,
    })
    return Promise.reject(err)
  },
)

instance.interceptors.request.use(
  (config) => {
    const { url } = config
    if (url.indexOf(apiProductSearchAutocompletePath) === -1) {
      dispatch(loadingStart())
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

import axios from 'axios'
import querystring from 'querystring'
import { store, actions } from 'storage'
import {
  apiprofileUpdatePath,
} from 'config/apiPath'
import { convertToSnakecase } from '../functions'


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
    return Promise.reject(err)
  },
)

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().loginData.token
    dispatch(loadingStart())
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

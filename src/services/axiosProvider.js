import axios from 'axios'
import querystring from 'querystring'
import { store, actions } from 'storage'
import {
  apiLoginPath,
  apiSignupPath,
  apiRecoveryPasswordPath,
  apiEmailVerify,
  apiLogoutPath,
  apiProfilePath,
  apiprofileUpdatePath,
} from 'config/apiPath'
import { convertToCamelcase, convertToSnakecase } from './functions'


import { apiBaseURL } from '../config/constants'

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

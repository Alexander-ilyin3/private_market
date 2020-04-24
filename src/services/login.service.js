import {
  apiLoginPath,
  apiSignupPath,
  apiRecoveryPasswordPath,
  apiResetPasswordPath,
  apiLogoutPath,
} from 'config/apiPath'
import { loginAaction, logoutAction } from 'storage/actions/login.actions'
import instance from './axiosProvider'


export const signup = async (signUpData) => {
  const signUpDataSend = {
    customer_name: signUpData.name,
    customer_email: signUpData.email,
    customer_password: signUpData.password,
    customer_phone: signUpData.phone,
    customer_website: signUpData.url,
    c_password: signUpData.repeatPassword,
  }
  try {
    await instance.post(apiSignupPath, signUpDataSend)
    return 'Регистрация завершена. На вашу почту были отправлены дальнейшие инструкции'
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message = {} } = data
    if (typeof message === 'string') {
      throw new Error(message)
    }
    throw new Error('Signup Failed!')
  }
}

export const signin = loginData => async (dispatch) => {
  const loginDataSend = {
    customer_email: loginData.email,
    customer_password: loginData.password,
  }
  try {
    const res = await instance.post(apiLoginPath, loginDataSend)
    const { data = {} } = res || {}
    const { token_type, access_token } = data

    if (data.success) {
      dispatch(loginAaction({
        isLoggedIn: true,
        token: `${token_type} ${access_token}`,
      }))
    } else {
      dispatch(loginAaction({
        error: 'Someting Went Wrong',
      }))
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message } = data
    let error = ''
    if (typeof message === 'string') {
      error = message
    } else {
      error = 'Oops, something went wrong'
    }
    dispatch(loginAaction({
      isLoggedIn: false,
      token: null,
      error,
    }))
  }
}


export const checkToken = async (token) => {
  try {
    const res = await instance.get(apiResetPasswordPath, { params: { token } })
    if (res && res.data) {
      const { success } = res.data
      return { success }
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message = {} } = data
    return { success: false, message }
  }
}

export const resetPassword = async (data) => {
  try {
    const res = await instance.post(apiResetPasswordPath, data)
    if (res && res.data) {
      return { success: res.data.success }
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message = {}, success } = data
    if (typeof message === 'string') {
      return { success, message }
    }
    return { success, message: 'Что-то пошло нетак' }
  }
}

export const recovery = async (customer_email) => {
  try {
    const res = await instance.post(apiRecoveryPasswordPath, { customer_email })
    if (res) {
      return true
    }
  } catch (err) {
    const { response = {} } = err || {}
    const { data = {} } = response
    const { message = {} } = data
    if (typeof message === 'string') {
      throw new Error(message)
    }
    if (message.recovery) {
      throw new Error(message.recovery)
    }
    throw new Error('Ошибка восстановления пароля')
  }
}

export const logout = () => async (dispatch) => {
  try {
    const res = await instance.post(apiLogoutPath)
    if (res) {
      return (true)
    }
  } catch (err) {
    console.log(err)
  } finally {
    dispatch(logoutAction())
  }
}

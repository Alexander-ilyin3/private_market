import { LOG_IN, LOG_OUT } from '../constants/login.constants'

const loginAaction = payload => ({
  type: LOG_IN,
  payload,
})

const logoutAction = () => ({
  type: LOG_OUT,
})

export { loginAaction, logoutAction }
export default { loginAaction, logoutAction }

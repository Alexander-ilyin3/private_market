import { SET_USERDATA } from '../constants'

const setUserData = payload => ({
  type: SET_USERDATA,
  payload,
})


export { setUserData }
export default { setUserData }

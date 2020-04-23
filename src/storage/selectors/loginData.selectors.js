const loginData = state => state.loginData || {}
const isLoggedIn = state => loginData(state).isLoggedIn
const error = state => loginData(state).error

export { loginData, isLoggedIn, error }
export default { loginData, isLoggedIn, error }

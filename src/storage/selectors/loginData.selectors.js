const loginData = state => state.loginData || {}
const isLoggedIn = state => loginData(state).isLoggedIn

export { loginData, isLoggedIn }
export default { loginData, isLoggedIn }

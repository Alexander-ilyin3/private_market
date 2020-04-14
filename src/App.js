import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Guest from 'components/pages/Guest'
import AppDrawer from 'components/AppDrawer'

const App = (props) => {
  const { loginData } = props
  const { isLoggedIn } = loginData
  if (isLoggedIn/* true */) {
    return (
      <BrowserRouter>
        <AppDrawer />
      </BrowserRouter>
    )
  }
  return (
    <Guest />
  )
}

export default connect(
  state => ({
    loginData: state.loginData,
  }),
)(App)

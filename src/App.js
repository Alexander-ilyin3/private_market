import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Guest from 'components/pages/Guest'
import AppDrawer from 'components/AppDrawer'
import { loginDataSelector } from 'storage/selectors'
import { clearCart } from 'services/cart/cartService'
import { initApp } from 'services/appInit'

const App = (props) => {
  const { isLoggedIn, init } = props
  if (isLoggedIn/* true */) {
    init()
    return (
      <BrowserRouter>
        <AppDrawer />
      </BrowserRouter>
    )
  }
  clearCart()
  return (
    <Guest />
  )
}

const mapStateToProps = state => ({
  isLoggedIn: loginDataSelector.isLoggedIn(state),
})

const mapDispatchToProps = dispatch => ({
  init: () => initApp(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

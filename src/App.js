import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Guest from 'components/pages/Guest'
import AppDrawer from 'components/AppDrawer'
import { loginDataSelector } from 'storage/selectors'
import { userData } from 'storage/selectors/userData.selector'
import { clearCart } from 'services/cart/cartService'
import { initApp } from 'services/appInit'

const App = (props) => {
  const { isLoggedIn, init, user } = props
  useEffect(() => {
    if (isLoggedIn) {
      init()
    } else {
      clearCart()
    }
  }, [isLoggedIn])

  if (isLoggedIn) {
    return user && user.roles ? (
      <BrowserRouter>
        <AppDrawer />
      </BrowserRouter>
    ) : null
  }
  return (
    <Guest />
  )
}

const mapStateToProps = state => ({
  isLoggedIn: loginDataSelector.isLoggedIn(state),
  user: userData(state),
})

const mapDispatchToProps = dispatch => ({
  init: () => initApp(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

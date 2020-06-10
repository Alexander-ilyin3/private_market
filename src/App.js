import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Guest from 'components/pages/Guest'
import AppDrawer from 'components/AppDrawer'
import { loginDataSelector } from 'storage/selectors'
import { userData } from 'storage/selectors/userData.selector'
import { clearCart } from 'services/cart/cartService'
import { initApp } from 'services/appInit'
import ShowSnack from 'components/parts/ShowSnack'

const App = (props) => {
  const { isLoggedIn, init, user } = props
  useEffect(() => {
    if (isLoggedIn) {
      init()
    } else {
      clearCart()
    }
  }, [isLoggedIn])

  return (
    <>
      <ShowSnack />
      {isLoggedIn ? (
        user && user.roles && (
          <BrowserRouter>
            <AppDrawer />
          </BrowserRouter>
        )
      ) : <Guest />}
    </>
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

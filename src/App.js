import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Guest from 'components/pages/Guest'
import AppDrawer from 'components/AppDrawer'
import { loginDataSelector } from 'storage/selectors'
import { getCartFromStorage, clearCart } from 'services/cart/cartService'

const App = (props) => {
  const { isLoggedIn } = props
  getCartFromStorage()
  if (isLoggedIn/* true */) {
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

export default connect(mapStateToProps)(App)

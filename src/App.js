import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loginDataSelector } from 'storage/selectors'
import { userData } from 'storage/selectors/userData.selector'
import { clearCart } from 'services/cart/cartService'
import { initApp } from 'services/appInit'
import ShowSnack from 'components/parts/ShowSnack'
import Router from 'components/parts/Router/RouterDecider'

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
      <Router isLoggedIn={isLoggedIn} user={user} />
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

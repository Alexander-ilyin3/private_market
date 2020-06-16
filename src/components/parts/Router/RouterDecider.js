import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { confirmEmailPath } from 'config/routes'
import Guest from 'components/pages/Guest'
import AppDrawer from 'components/AppDrawer'
import EmailConfirm from 'components/pages/Guest/pages/EmailConfirm'

const Routerdecider = ({ user, isLoggedIn }) => {
  if (isLoggedIn) return (user && user.roles) ? <AppDrawer /> : null
  return <Guest />
}

Routerdecider.defaultProps = {
  user: {},
  isLoggedIn: false,
}

Routerdecider.propTypes = {
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
}

const Router = props => (
  <BrowserRouter>
    <Switch>
      <Route path={confirmEmailPath} component={EmailConfirm} />
      <Route path='/' render={() => <Routerdecider {...props} />} />
    </Switch>
  </BrowserRouter>
)

export default Router

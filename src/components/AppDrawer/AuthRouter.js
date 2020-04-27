import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {
  newOrderPath,
  statisticPath,
  profilePath,
  productsPath,
  paymentLogPath,
  ordersPath,
  signInPath,
} from 'config/routes'
import { ROOT_DOMAIN } from 'config/constants'

import UserView from 'components/pages/UserView'
import Products from 'components/pages/products'
import NewOrder from 'components/pages/NewOrder/NewOrder'

const AuthRouter = () => (
  <Switch>
    <Redirect path={signInPath} to={profilePath} />
    <Redirect exact path={ROOT_DOMAIN} to={newOrderPath} />
    <Route path={profilePath} component={UserView} />
    <Route path={productsPath} component={Products} />
    <Route path={newOrderPath} component={NewOrder} />
    <Redirect path={ROOT_DOMAIN} to={profilePath} />
  </Switch>
)

export default AuthRouter

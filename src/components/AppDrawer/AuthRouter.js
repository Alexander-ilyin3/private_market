import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  newOrderPath,
  statisticPath,
  profilePath,
  productsPath,
  paymentLogPath,
  ordersPath,
} from 'config/routes'
import { ROOT_DOMAIN } from 'config/constants'

import UserView from 'components/pages/UserView'
import Products from 'components/pages/products'

const AuthRouter = () => (
  <Switch>
    <Route path={profilePath} component={UserView} />
    <Route path={productsPath} component={Products} />
    <Route path={newOrderPath} />
    <Route path={ROOT_DOMAIN} />
  </Switch>
)

export default AuthRouter

import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {
  newOrderPath,
  statisticPath,
  profilePath,
  productsPath,
  paymentLogPath,
  ordersPath,
  signInPath,
  productsCategoriesPath,
  productViewPath,
  preorderPath,
  userListPath,
  orderDetailsPath,
} from 'config/routes'
import { ROOT_DOMAIN } from 'config/constants'
import {
  user,
  superAdmin,
  newUser,
  clientManager,
  client,
  admin,
  clientAccountant,
  purchasingManager,
  forAll,
  declineRoles,
} from 'config/roles'

import UserView from 'components/pages/UserView'
import Products from 'components/pages/products/Products'
import ProductCategories from 'components/pages/products/ProductCategories'
import NewOrder from 'components/pages/NewOrder/NewOrder'
import ProductView from 'components/pages/products/ProductView'
import Preorder from 'components/pages/Preorder'
import UserList from 'components/pages/UserList'
import OrderList from 'components/pages/OrderList'
import OrderDetails from 'components/pages/OrderDetails'

import PrivateRouter from 'components/parts/PrivateRoute'

const AuthRouter = () => (
  <Switch>
    <Redirect path={signInPath} to={profilePath} />
    <Redirect exact path={ROOT_DOMAIN} to={newOrderPath} />
    <PrivateRouter path={profilePath} component={UserView} allowedRoles={declineRoles([newUser])} />
    <PrivateRouter
      path={newOrderPath}
      exact
      component={NewOrder}
      allowedRoles={declineRoles([newUser])}
    />
    <PrivateRouter
      path={productsPath}
      exact
      component={Products}
      allowedRoles={declineRoles([newUser])}
    />
    <PrivateRouter
      path={productsCategoriesPath}
      component={ProductCategories}
      allowedRoles={declineRoles([newUser])}
    />
    <PrivateRouter
      path={orderDetailsPath}
      component={OrderDetails}
      allowedRoles={declineRoles([newUser])}
    />
    <PrivateRouter
      path={productViewPath}
      component={ProductView}
      allowedRoles={declineRoles([newUser])}
    />
    <PrivateRouter
      path={preorderPath}
      component={Preorder}
      allowedRoles={declineRoles([newUser])}
    />
    <PrivateRouter
      path={ordersPath}
      component={OrderList}
      allowedRoles={declineRoles([newUser])}
    />
    <PrivateRouter
      path={userListPath}
      component={UserList}
      allowedRoles={[admin, superAdmin]}
    />
    <Redirect path={ROOT_DOMAIN} to={profilePath} />
  </Switch>
)


export default AuthRouter

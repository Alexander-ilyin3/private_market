import React from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import {
  signInPath,
  registerSuccessPath,
  recoveryPasswordPath,
  signUpPath,
  recoveryPasswordSuccessPath,
  resetPassword,
} from 'config/routes'
import { ROOT_DOMAIN } from 'config/constants'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AfterReg from './pages/AfterReg'
import Recovery from './pages/Recovery'
import RecoverySuccess from './pages/RecoverySuccess'
import RestorePassword from './pages/RestorePassword'

export default function () {
  return (
    <Switch>
      <Route exact path={signUpPath} component={SignUp} />
      <Route exact path={registerSuccessPath} component={AfterReg} />
      <Route exact path={recoveryPasswordPath} component={Recovery} />
      <Route exact path={recoveryPasswordSuccessPath} component={RecoverySuccess} />
      <Route path={signInPath} component={SignIn} />
      <Route path={resetPassword} component={RestorePassword} />
      <Redirect path={ROOT_DOMAIN} to={signInPath} />
    </Switch>
  )
}

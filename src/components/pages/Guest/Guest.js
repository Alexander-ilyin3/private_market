import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { signInPath, registerSuccessPath, recoveryPasswordPath, signUpPath, recoveryPasswordSuccessPath } from '../../../config/routes';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AfterReg from './pages/AfterReg';
import Recovery from './pages/Recovery';
import RecoverySuccess from './pages/RecoverySuccess';
import Home from 'components/pages/Home';

export default function () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={signUpPath} render={() => <SignUp />} />
        <Route exact path={registerSuccessPath} render={() => <AfterReg />} />
        <Route exact path={recoveryPasswordPath} render={() => <Recovery />} />
        <Route exact path={recoveryPasswordSuccessPath} render={() => <RecoverySuccess />} />
        <Route path={signInPath} render={() => <SignIn />} />
        <Route path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

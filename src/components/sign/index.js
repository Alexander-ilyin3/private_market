import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { signInPath, registerSuccessPath, recoveryPasswordPath, signUpPath, recoveryPasswordSuccessPath } from '../../config/routes';

import SignIn from './SignIn';
import SignUp from './SignUp';
import AfterReg from './AfterReg';
import Recovery from './Recovery';
import RecoverySuccess from './RecoverySuccess';
import Home from '../Home';

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={signUpPath} render={() => <SignUp />} />
                <Route exact path={registerSuccessPath} render={() => <AfterReg />} />
                <Route exact path={recoveryPasswordPath} render={() => <Recovery />} />
                <Route exact path={recoveryPasswordSuccessPath} render={() => <RecoverySuccess /> } />
                <Route path={signInPath} render={() => <SignIn />} />
                <Route path='/' component={Home} />
            </Switch>
        </BrowserRouter>
    );
}
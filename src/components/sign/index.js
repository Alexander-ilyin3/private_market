import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { apiSignupPath, apiRegisterSuccessPath, apiRecoveryPasswordPath, apiRecoverySuccessPath } from '../../config';

import SignIn from './SignIn';
import SignUp from './SignUp';
import AfterReg from './AfterReg';
import Recovery from './Recovery';
import RecoverySuccess from './RecoverySuccess';

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={apiSignupPath} render={() => <SignUp />} />
                <Route exact path={apiRegisterSuccessPath} render={() => <AfterReg />} />
                <Route exact path={apiRecoveryPasswordPath} render={() => <Recovery />} />
                <Route exact path={apiRecoverySuccessPath} render={() => <RecoverySuccess /> } />
                <Route path='/' render={() => <SignIn />} />
            </Switch>
        </BrowserRouter>
    );
}
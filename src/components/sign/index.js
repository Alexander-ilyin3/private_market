import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { apiSignupPath, apiRegisterSuccessPath } from '../../config';

import SignIn from './SignIn';
import SignUp from './SignUp';
import AfterReg from './AfterReg';

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={apiSignupPath} render={() => <SignUp />} />
                <Route exact path={apiRegisterSuccessPath} render={() => <AfterReg />} />
                <Route path='/' render={() => <SignIn />} />
            </Switch>
        </BrowserRouter>
    );
}
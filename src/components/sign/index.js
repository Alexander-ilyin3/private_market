import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';
import AfterReg from './AfterReg';

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/register' render={() => <SignUp />} />
                <Route exact path='/successreg' render={() => <AfterReg/>} />
                <Route path='/' render={() => <SignIn />} />
            </Switch>
        </BrowserRouter>
    );
}
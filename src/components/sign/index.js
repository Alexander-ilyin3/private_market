import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/register' render={() => <SignUp />} />
                <Route path='/' render={() => <SignIn />} />
            </Switch>
        </BrowserRouter>
    );
}
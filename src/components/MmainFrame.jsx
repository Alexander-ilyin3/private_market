import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { apiProfile, apiBaseURL, apiNewOrder } from '../config';

import UserView from './userPages/UserView';

class MainFrame extends Component {
    render() {
        return (
            <Switch>
                <Route path={apiProfile} component={UserView} />
                <Route path={apiNewOrder} />
                <Route path={apiBaseURL} />
            </Switch>
        );
    }
}

export default MainFrame;
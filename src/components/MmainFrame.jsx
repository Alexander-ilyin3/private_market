import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { apiProfilePath, apiBaseURL, apiNewOrderPath } from '../config';

import UserView from './userPages/UserView';

class MainFrame extends Component {
    render() {
        return (
            <Switch>
                <Route path={apiProfilePath} component={UserView} />
                <Route path={apiNewOrderPath} />
                <Route path={apiBaseURL} />
            </Switch>
        );
    }
}

export default MainFrame;
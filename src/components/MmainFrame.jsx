import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { newOrderPath, statisticPath, profilePath, productsPath, paymentLogPath, ordersPath, apiBaseURL } from '../config';

import UserView from './userPages/UserView';
import Products from './productsPages/Products';

class MainFrame extends Component {
    render() {
        return (
            <Switch>
                <Route path={profilePath} component={UserView} />
                <Route path={productsPath} component={Products} />
                <Route path={newOrderPath} />
                <Route path={apiBaseURL} />
            </Switch>
        );
    }
}

export default MainFrame;
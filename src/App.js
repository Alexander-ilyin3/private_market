import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import Guest from 'components/pages/Guest';
import AppDrawer from 'components/AppDrawer';

class App extends Component {
	render() {
		const { isLoggedIn } = this.props.loginData;
		if (isLoggedIn/*true*/) {
			return (
				<BrowserRouter>
					<AppDrawer />
				</BrowserRouter >
			);
		} else {
			return (
				<Guest />
			);
		}
	}
}

export default connect(
	state => ({
		loginData: state.loginData,
	}),
)(App);

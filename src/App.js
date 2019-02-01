import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import Sign from './components/sign';
import Drawer from './components/Drawer';

class App extends Component {
	render() {
		const { isLoggedIn } = this.props.loginData;
		if (isLoggedIn/*true*/) {
			return (
				<BrowserRouter>
					<Drawer />
				</BrowserRouter >
			);
		} else {
			return (
				<Sign />
			);
		}
	}
}

export default connect(
	state => ({
		loginData: state.loginData,
	}),
)(App);

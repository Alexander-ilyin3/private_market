import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import Sign from './components/sign';
import Drawer from './components/Drawer';

class App extends Component {
	render() {
		const { isLoggedIn, user, isLoad } = this.props.loginData;
		if (/*isLoggedIn*/true) {
			user.token && (axios.defaults.headers.common['Authorization'] = `Token ${user.token}`);
			return (
				<BrowserRouter>
					<Drawer role={user.role} isLoad={isLoad} />
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

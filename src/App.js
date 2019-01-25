import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Sign from './components/sign';
import Drawer from './components/Drawer';

class App extends Component {
	render() {
		const { isLoggedIn, user, isLoad } = this.props.loginData;
		if (isLoggedIn) {
			user.token && (axios.defaults.headers.common['Authorization'] = `Token ${user.token}`);
			return (

				<Drawer role={user.role} isLoad={isLoad} />

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

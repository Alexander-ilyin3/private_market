import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Sign from './components/sign';
import MainFrame from './components/mainFrame';

class App extends Component {
	render() {
		const { isLoggedIn, user, isLoad } = this.props.loginData;
		if (isLoggedIn) {
			user.token && (axios.defaults.headers.common['Authorization'] = `Token ${user.token}`);
			return (

				<MainFrame role={user.role} isLoad={isLoad} />

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

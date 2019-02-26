import React from 'react';
import { Redirect } from 'react-router-dom';
import { signInPath } from '../config/routes';

const Home = () => <Redirect to={signInPath} />;

export default Home;
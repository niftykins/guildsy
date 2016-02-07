import React from 'react';
import {render} from 'react-dom';
window.React = React;

import {Router, Route} from 'react-router';
import {createHistory} from 'history';
const history = createHistory();

import App from './components/App';

import SignIn from './components/Auth/SignIn';
import CreateAccount from './components/Auth/CreateAccount';

const router = (
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="sign-in" component={SignIn} />
			<Route path="create-account" component={CreateAccount} />
		</Route>
	</Router>
);

Meteor.startup(() => {
	const rootElement = document.getElementById('root');
	render(router, rootElement);
});

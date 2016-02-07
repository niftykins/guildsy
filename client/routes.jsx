import React from 'react';
import {render} from 'react-dom';
window.React = React;

import {Router, Route} from 'react-router';
import {createHistory} from 'history';
const history = createHistory();

import App from './components/App';

import SignIn from './components/Auth/SignIn';
import CreateAccount from './components/Auth/CreateAccount';

import CreateGroup from './components/CreateGroup/CreateGroup';

const router = (
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="sign-in" component={SignIn} />
			<Route path="create-account" component={CreateAccount} />

			<Route path="create-group" component={CreateGroup} />
		</Route>
	</Router>
);

Meteor.startup(() => {
	const rootElement = document.getElementById('root');
	render(router, rootElement);
});

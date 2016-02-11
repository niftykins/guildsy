import React from 'react';
import {render} from 'react-dom';
window.React = React;

import {Router, Route, browserHistory} from 'react-router';

import AuthedLayout from './components/AuthedLayout';
import UnauthedLayout from './components/UnauthedLayout';

import SignIn from './components/Auth/SignIn';
import CreateAccount from './components/Auth/CreateAccount';

import CreateGroup from './components/CreateGroup/CreateGroup';

const router = (
	<Router history={browserHistory}>
		<Route component={UnauthedLayout}>
			<Route path="sign-in" component={SignIn} />
			<Route path="create-account" component={CreateAccount} />
		</Route>

		<Route path="/" component={AuthedLayout}>
			<Route path="create-group" component={CreateGroup} />
		</Route>
	</Router>
);

Meteor.startup(() => {
	const rootElement = document.getElementById('root');
	render(router, rootElement);
});

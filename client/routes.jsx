import React from 'react';
import {render} from 'react-dom';
window.React = React;

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
window.browserHistory = browserHistory;

import AuthedLayout from './components/Layouts/AuthedLayout';
import UnauthedLayout from './components/Layouts/UnauthedLayout';

import SignIn from './components/Auth/SignIn';
import CreateAccount from './components/Auth/CreateAccount';

import IndexPage from './components/Index/IndexPage';

import CreateGroup from './components/CreateGroup/CreateGroup';
import ExplorePage from './components/Explore/ExplorePage';

import GroupInfo from './components/GroupInfo/GroupInfo';

import Members from './components/Members/Members';
import Member from './components/Members/Member';

import LatestThreads from './components/Forum/LatestThreads';
import CreateThread from './components/Forum/CreateThread';
import Thread from './components/Forum/Thread';

const router = (
	<Router history={browserHistory}>
		<Route component={UnauthedLayout}>
			<Route path="sign-in" component={SignIn} />
			<Route path="create-account" component={CreateAccount} />
		</Route>

		<Route path="/" component={AuthedLayout}>
			<IndexRoute component={IndexPage} />

			<Route path="create-group" component={CreateGroup} />

			<Route path="explore" component={ExplorePage} />

			<Route path="g/:groupUrl">
				<Route path="info" component={GroupInfo} />

				<Route path="members" component={Members} />
				<Route path="members/:username" component={Member} />

				<Route path="forum" component={LatestThreads} />
				<Route path="forum/create-thread" component={CreateThread} />
				<Route path="forum/t/:threadId" component={Thread} />
			</Route>
		</Route>
	</Router>
);

Meteor.startup(() => {
	const rootElement = document.getElementById('root');
	render(router, rootElement);
});

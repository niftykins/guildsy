import {Component, PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';
import {browserHistory} from 'react-router';

import Alert from '../Alert/Alert';
import Nav from '../Nav/Nav';

@ReactMixin.decorate(ReactMeteorData)
export default class AuthedLayout extends Component {
	static propTypes = {
		children: PropTypes.node,
		location: PropTypes.object
	};

	getMeteorData() {
		const isLoading = !Meteor.subscribe('user').ready();

		// not logged in and not current logging in
		if ( ! Meteor.user() && ! Meteor.loggingIn()) {
			this.redirectToLogin();
		}

		return {
			user: Meteor.user(),
			isLoading
		};
	}

	redirectToLogin() {
		browserHistory.replace({
			pathname: '/sign-in',
			state: {
				pathname: this.props.location.pathname
			}
		});
	}

	render() {
		const {user, isLoading} = this.data;
		let child = this.props.children;

		if ( ! user) return null;

		if (isLoading) {
			child = <LoadingContainer />;
		}

		return (
			<div className="app">
				<Alert />

				<div className="page-container flex-display">
					<Nav {...this.props} />

					{child}
				</div>
			</div>
		);
	}
}

function LoadingContainer() {
	return (
		<div className="page-container">
		</div>
	);
}

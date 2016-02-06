import {Component, PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import SignIn from './Auth/SignIn';
import Alert from './Alert/Alert';

@ReactMixin.decorate(ReactMeteorData)
export default class App extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		params: PropTypes.object.isRequired,
		children: PropTypes.node
	};

	getMeteorData() {
		const user = Meteor.user();
		// const handle = Meteor.subscribe('user');

		return {
			// isLoading: !handle.ready(),
			user
		};
	}

	render() {
		const {user, isLoading} = this.data;
		let child = this.props.children;

		if ( ! user) {
			child = <SignIn {...this.props} />;
		}

		if (isLoading) {
			child = <LoadingContainer />;
		}

		return (
			<div className="app">
				<Alert />

				{child}
			</div>
		);
	}
}

class LoadingContainer extends Component {
	render() {
		return (
			<div className="page-container">
				Doing the loading!
			</div>
		);
	}
}

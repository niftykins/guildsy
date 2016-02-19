import {Component, PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import {getState} from 'utils/groupState';

import ForumNavBar from './ForumNavBar';
import ThreadList from './ThreadList';

import {Threads} from 'models';

@ReactMixin.decorate(ReactMeteorData)
export default class LatestThreads extends Component {
	static propTypes = {
		params: PropTypes.object.isRequired
	}

	getMeteorData() {
		const {groupUrl} = this.props.params;

		if (Meteor.subscribe('threads.latest', groupUrl).ready()) {
			const {groupId} = getState();
			const threads = Threads.fetchLatest(groupId, true);

			return {threads};
		}

		return {isLoading: true};
	}

	render() {
		if (this.data.isLoading) return null;

		return (
			<div className="page-container threads-page">
				<ForumNavBar {...this.props} />
				<ThreadList threads={this.data.threads} />
			</div>
		);
	}
}

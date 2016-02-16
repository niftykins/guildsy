import {Component, PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';
import {browserHistory} from 'react-router';

import JoinGroup from './JoinGroup';
import Group404 from './Group404';

import {Groups, GroupMembers} from 'models';

@ReactMixin.decorate(ReactMeteorData)
export default class IndexGroup extends Component {
	static propTypes = {
		params: PropTypes.object.isRequired
	}

	getMeteorData() {
		const {groupUrl} = this.props.params;

		if (Meteor.subscribe('group.info', groupUrl).ready()) {
			const group = Groups.fetchByUrl(groupUrl);
			const isMember = group && GroupMembers.fetchUsersMember(group._id);

			return {isMember, group};
		}

		return {isLoading: true};
	}

	onJoinGroup = (username) => {
		const {group} = this.data;

		group.joinGroup(username, (err) => {
			if ( ! err) browserHistory.push(group.getUrl());
		});
	}

	render() {
		const {isLoading, isMember, group} = this.data;

		if (isLoading) return null;
		if ( ! group) return <Group404 />;


		const memberSuffix = group.memberCount === 1 ? 'member' : 'members';

		return (
			<div className="page-container">
				<div className="max-container huge-padding-top">
					<div className="group-info col-1-2 margin-auto">
						<div className="info">
							<img src="https://placehold.it/150x150" />

							<h1 className="name">
								{group.name}
							</h1>

							<div className="members">
								{group.memberCount} {memberSuffix}
							</div>
						</div>

						{ ! isMember &&
							<JoinGroup onSubmit={this.onJoinGroup} />
						}
					</div>
				</div>
			</div>
		);
	}
}

import {Component} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import {getHandle, getState} from 'utils/groupState';

import RelativeLink from '../Utils/RelativeLink';

import {GroupMembers} from 'models';

@ReactMixin.decorate(ReactMeteorData)
export default class Members extends Component {
	getMeteorData() {
		if (getHandle().ready()) {
			const {groupId} = getState();
			const members = GroupMembers.find({groupId}).fetch();

			return {members};
		}

		return {isLoading: true};
	}

	renderMembers() {
		const members = this.data.members.map((member) => {
			return <Member key={member._id} member={member} />;
		});

		return (
			<div className="members">
				{members}
			</div>
		);
	}

	render() {
		if (this.data.isLoading) return null;

		return (
			<div className="page-container">
				<div className="members-page">
					<h1>Group Members</h1>

					{this.renderMembers()}
				</div>
			</div>
		);
	}
}

function Member({member}) {
	return (
		<RelativeLink
			className="member"
			to={member.username}
		>
			<img src="https://placehold.it/50x50" />

			<div className="info">
				<div className="name">
					{member.username}
				</div>
			</div>
		</RelativeLink>
	);
}

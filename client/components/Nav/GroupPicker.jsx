import {Component} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import {Link} from 'react-router';

@ReactMixin.decorate(ReactMeteorData)
export default class GroupPicker extends Component {
	getMeteorData() {
		const groups = Meteor.user().fetchGroups();

		return {groups};
	}

	render() {
		const groups = this.data.groups.map((group) => {
			return <GroupIcon key={group._id} group={group} />;
		});

		return (
			<div className="group-picker">
				<div className="group-icons">
					{groups}
				</div>

				<Link
					className="create-icon"
					to="/explore"
					activeClassName="active"
				>
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}
}

function GroupIcon({group}) {
	return (
		<div className="group-icon-wrapper">
			<Link
				className="group-icon"
				to={group.getUrl()}
				activeClassName="active"
			>
				{group.name[0]}
			</Link>
		</div>
	);
}

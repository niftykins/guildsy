import {Component} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import {Link} from 'react-router';
import {ExploreGroups} from 'models/client';

@ReactMixin.decorate(ReactMeteorData)
export default class Explore extends Component {
	getMeteorData() {
		const groups = ExploreGroups.fetchExploreGroups();

		return {groups};
	}

	componentWillMount() {
		ExploreGroups.updateExploreGroups();
	}

	renderGroups() {
		const groups = this.data.groups.map((group) => {
			return <GroupTile key={group._id} group={group} />;
		});

		return (
			<div className="tiles">
				{groups}
			</div>
		);
	}

	render() {
		return (
			<div className="page-container flex-expand">
				<div className="explore-groups">
					<h1>Explore groups</h1>

					{this.renderGroups()}
				</div>
			</div>
		);
	}
}

function GroupTile({group}) {
	const memberSuffix = group.memberCount === 1 ? 'member' : 'members';

	return (
		<Link
			className="tile"
			title={group.name}
			to={`/${group.url}`}
		>
			<img src="https://placehold.it/150x150" />

			<div className="name">
				{group.name}
			</div>

			<div className="members">
				{group.memberCount} {memberSuffix}
			</div>
		</Link>
	);
}

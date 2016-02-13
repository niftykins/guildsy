import {Component} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import ExplorePage from '../Explore/ExplorePage';

@ReactMixin.decorate(ReactMeteorData)
export default class IndexPage extends Component {
	getMeteorData() {
		const groups = Meteor.user().fetchGroups();

		return {groups};
	}

	render() {
		const {groups} = this.data;

		if ( ! groups.length) return <ExplorePage />;

		return (
			<div className="page-container">
				has groups
			</div>
		);
	}
}

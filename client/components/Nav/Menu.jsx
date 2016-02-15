import {Component, PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';
import classnames from 'classnames';

import * as GroupState from 'utils/GroupState';

import {Groups, GroupMembers} from 'models';

@ReactMixin.decorate(ReactMeteorData)
export default class Menu extends Component {
	static propTypes = {
		groupUrl: PropTypes.string
	}

	getMeteorData() {
		const {groupUrl} = this.props;

		// early exit if we aren't actually viewing a group
		if ( ! groupUrl) return {};

		if (GroupState.subscribe(groupUrl).ready()) {
			const group = Groups.fetchByUrl(groupUrl);
			const member = group && GroupMembers.fetchUsersMember(group._id);

			return {member, group};
		}

		return {isLoading: true};
	}

	render() {
		const showContent = !this.data.isLoading && this.props.groupUrl;

		const menuClassName = classnames({
			'empty-frame': !this.props.groupUrl
		}, 'nav-menu');

		return (
			<div className={menuClassName}>
				{showContent && <Header {...this.data} />}
			</div>
		);
	}
}

function Header({group, member}) {
	return (
		<div className="header">
			<div className="group-name">
				{group.name}

				<i className="material-icons">keyboard_arrow_down</i>
			</div>

			<div className="member-name">
				{member.username}
			</div>
		</div>
	);
}

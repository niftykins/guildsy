import {Component, PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';
import classnames from 'classnames';

import {Link} from 'react-router';

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

		const handle = GroupState.subscribe(groupUrl);
		const group = Groups.fetchByUrl(groupUrl);
		const member = group && GroupMembers.fetchUsersMember(group._id);

		return {
			isLoading: !handle.ready(),
			member,
			group
		};
	}

	render() {
		const {member} = this.data;

		const showContent = !!member;

		const menuClassName = classnames({
			'empty-frame': !member
		}, 'nav-menu');

		return (
			<div className={menuClassName}>
				{showContent && <Header {...this.data} />}

				{showContent && <Members {...this.data} />}
				{showContent && <Forums {...this.data} />}
			</div>
		);
	}
}

function Header({group, member}) {
	return (
		<div className="menu-header">
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

function Members({group}) {
	return (
		<div className="menu-section">
			<div className="heading">
				Members

				{!!group.memberCount &&
					<span className="count">
						({group.memberCount})
					</span>
				}
			</div>

			<div className="content">
				<Link
					to={`${group.getUrl()}/members`}
					activeClassName="active"
				>
					Group Members
				</Link>
			</div>
		</div>
	);
}

function Forums({group}) {
	return (
		<div className="menu-section">
			<Link
				className="heading"
				to={`${group.getUrl()}/forum`}
				activeClassName="active"
			>
				Forum
			</Link>
		</div>
	);
}

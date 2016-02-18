import {Component, PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';
import classnames from 'classnames';
import {browserHistory} from 'react-router';

import {getHandle, getState} from 'utils/groupState';
import {replaceLastSegment} from 'utils/url';

import Input from '../Utils/Input';

import {GroupMembers} from 'models';

@ReactMixin.decorate(ReactMeteorData)
export default class Member extends Component {
	static propTypes = {
		params: PropTypes.object.isRequired
	}

	getMeteorData() {
		if (getHandle().ready()) {
			const {groupId} = getState();

			const member = GroupMembers.findOne({
				username: this.props.params.username,
				groupId
			});

			const user = GroupMembers.fetchUsersMember(groupId);

			return {member, user};
		}

		return {isLoading: true};
	}

	onSubmit = (update) => {
		this.data.member.updateMember(update, (err) => {
			if (err) return;

			const url = replaceLastSegment(update.username);
			browserHistory.push(url);
		});
	}

	render() {
		const {isLoading, member, user} = this.data;

		if (isLoading) return null;
		if ( ! member) return null;

		return (
			<MemberInfo
				member={member}
				user={user}
				onSubmit={this.onSubmit}
			/>
		);
	}
}

class MemberInfo extends Component {
	static propTypes = {
		member: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
		onSubmit: PropTypes.func.isRequired
	}

	state = {
		disabled: true
	}

	checkRefsForDisabled = () => {
		let disabled = false;

		const username = this.refs.username.getValue();

		const free = GroupMembers.checkUsernameAvailability(this.props.member.groupId, username);

		if ( ! username || ! free) {
			disabled = true;
		}

		if (disabled !== this.state.disabled) {
			this.setState({disabled});
		}
	}

	onSubmit = (e) => {
		e.preventDefault();

		const username = this.refs.username.getValue();

		if ( ! username) return;

		this.props.onSubmit({username});
	}

	render() {
		const {member, user} = this.props;

		// can edit if admin or owner
		const canEdit = user.isAdmin || member._id === user._id;

		const buttonClassName = classnames({
			disabled: this.state.disabled
		}, 'green button margin-top');

		return (
			<div className="page-container">
				<div className="max-container huge-padding-top">
					<div className="member-page col-1-2 margin-auto">
						<form onSubmit={this.onSubmit}>
							<h1>Member Profile</h1>

							<img src="https://placehold.it/150x150" />

							<Input
								ref="username"
								label="Username"
								defaultValue={member.username}
								uneditable={!canEdit}
								onChange={this.checkRefsForDisabled}
							/>

							{member.isOwner &&
								<p className="small description">
									This member is the owner of the group.
								</p>
							}

							{member.isAdmin &&
								<p className="small description">
									This member is an administrator of the group.
								</p>
							}

							{canEdit &&
								<button
									className={buttonClassName}
									type="submit"
								>
									Update
								</button>
							}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

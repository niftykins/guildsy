import {Groups, GroupMembers} from 'models';

const Users = Meteor.users;
export default Users;

Users.helpers({
	fetchGroupMembers() {
		return GroupMembers.find({
			userId: this._id
		}).fetch();
	},

	fetchGroups() {
		const groupIds = this.fetchGroupMembers()
			.map((member) => member.groupId);

		return Groups.find({
			_id: {$in: groupIds}
		}).fetch();
	}
});

// stop users being able to edit their profile
Users.deny({
	update() {
		return false;
	}
});

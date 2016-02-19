import _ from '_';
import SimpleSchema from 'simple-schema';
import createdUpdated from './createdUpdated';

import methodCall from 'utils/methodCall';

import {Groups} from 'models';

const GroupMembers = new Mongo.Collection('group-members');
export default GroupMembers;

// XXX probably want indexes on groupId and userId
const schema = new SimpleSchema([createdUpdated, {
	groupId: {
		type: SimpleSchema.RegEx.Id,
		denyUpdate: true
	},
	userId: {
		type: SimpleSchema.RegEx.Id,
		denyUpdate: true
	},
	username: {
		type: String
	},
	isAdmin: {
		type: Boolean,
		defaultValue: false
	},
	isOwner: {
		type: Boolean,
		optional: true
	}
}]);

GroupMembers.attachSchema(schema);

_.extend(GroupMembers, {
	fetchMember(groupId, userId, opts = {}) {
		return this.findOne({userId, groupId}, opts);
	},

	// XXX this can't be called in pub functions
	fetchUsersMember(groupId, opts = {}) {
		const userId = Meteor.userId();

		return this.fetchMember(groupId, userId, opts);
	},

	checkUsernameAvailability(groupId, username) {
		const match = GroupMembers.findOne({
			username,
			groupId
		}, {
			fields: {
				_id: 1
			}
		});

		// return true for free, false for taken
		return !match;
	}
});

GroupMembers.helpers({
	// permissions

	// can update member if admin or self
	canUpdateMemberBasic(memberId) {
		return this.isAdmin || this._id === memberId;
	},

	// helpers
	updateMember(update, cb) {
		methodCall('groupMembers.update', this._id, update, cb);
	},

	getUrl() {
		const group = Groups.findOne(this.groupId, {
			fields: {url: 1}
		});

		return `${group.getUrl()}/members/${this.username}`;
	}
});

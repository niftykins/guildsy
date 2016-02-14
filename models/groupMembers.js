import _ from '_';
import SimpleSchema from 'simple-schema';
import createdUpdated from './createdUpdated';

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
	}
});

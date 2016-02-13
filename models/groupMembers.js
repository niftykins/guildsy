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
	fetchMember(userId, groupId, opts = {}) {
		return this.findOne({userId, groupId}, opts);
	}
});

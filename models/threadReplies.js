import SimpleSchema from 'simple-schema';
import createdUpdated from './createdUpdated';

const ThreadReplies  = new Mongo.Collection('threadReplies');
export default ThreadReplies;

const schema = new SimpleSchema([createdUpdated, {
	userId: {
		type: SimpleSchema.RegEx.Id,
		denyUpdate: true
	},
	threadId: {
		type: SimpleSchema.RegEx.Id,
		denyUpdate: true
	},
	groupId: {
		type: SimpleSchema.RegEx.Id,
		denyUpdate: true
	},

	content: {
		type: String
	},

	// automatically bump this field on each update
	editCount: {
		type: Number,
		autoValue() {
			if (this.isUpdate) return {$inc: 1};
			return 0;
		}
	}
}]);

ThreadReplies.attachSchema(schema);

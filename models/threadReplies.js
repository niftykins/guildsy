import _ from '_';
import SimpleSchema from 'simple-schema';
import createdUpdated from './createdUpdated';

import methodCall from 'utils/methodCall';

import {GroupMembers} from 'models';

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

_.extend(ThreadReplies, {
	fetchRepliesWithAuthors({groupId, threadId}) {
		return ThreadReplies.find({threadId}, {
			sort: {created: 1}
		}).map((reply) => {
			reply.author = GroupMembers.findOne({
				userId: reply.userId,
				groupId
			}) || {};

			return reply;
		});
	}
});

ThreadReplies.helpers({
	edit(data, cb) {
		methodCall('threadReplies.edit', this._id, data, cb);
	}
});


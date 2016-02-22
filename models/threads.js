import _ from '_';
import SimpleSchema from 'simple-schema';
import createdUpdated from './createdUpdated';

import methodCall from 'utils/methodCall';

import {GroupMembers, Groups, ThreadReplies} from 'models';

const Threads = new Mongo.Collection('threads');
export default Threads;

const schema = new SimpleSchema([createdUpdated, {
	userId: {
		type: SimpleSchema.RegEx.Id,
		denyUpdate: true
	},
	groupId: {
		type: SimpleSchema.RegEx.Id,
		denyUpdate: true
	},

	title: {
		type: String
	},
	content: {
		type: String
	},

	replyCount: {
		type: Number,
		defaultValue: 0
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

Threads.attachSchema(schema);

_.extend(Threads, {
	createThread(groupId, data, cb) {
		methodCall('threads.create', groupId, data, cb);
	},

	fetchLatest(groupId, withAuthor) {
		const threads = this.find({groupId}, {
			sort: {updated: -1}
		}).fetch();

		if (withAuthor) {
			threads.forEach((thread) => {
				thread.author = GroupMembers.findOne({
					groupId: thread.groupId,
					userId: thread.userId
				}) || {};
			});
		}

		return threads;
	},

	fetchWithAuthor(threadId) {
		const thread = Threads.findOne(threadId);

		thread.author = GroupMembers.findOne({
			groupId: thread.groupId,
			userId: thread.userId
		}) || {};

		return thread;
	}
});

Threads.helpers({
	fetchRepliesWithAuthors() {
		return ThreadReplies.find({
			threadId: this._id
		}, {
			sort: {created: 1}
		}).map((reply) => {
			reply.author = GroupMembers.findOne({
				groupId: this.groupId,
				userId: reply.userId
			}) || {};

			return reply;
		});
	},

	getUrl() {
		const group = Groups.findOne(this.groupId, {
			fields: {url: 1}
		});

		return `${group.getUrl()}/forum/t/${this._id}`;
	},

	createReply(data, cb) {
		methodCall('threads.reply', this._id, data, cb);
	}
});

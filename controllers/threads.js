import {GroupMembers, Threads, ThreadReplies} from 'models';
import {justIdField} from 'utils/common';

function createThread(groupId, data) {
	check(groupId, String);
	check(data, {
		title: String,
		content: String
	});

	// CHECKS
	// user is a member of the group

	// ACTIONS
	// create the new thread

	// check user is in group
	const member = GroupMembers.fetchUsersMember(groupId, justIdField);

	if ( ! member) {
		throw new Meteor.Error('permission-denied', 'You are not a member of this group');
	}

	const threadId = Threads.insert({
		content: data.content,
		title: data.title,

		userId: this.userId,
		groupId
	});

	return threadId;
}

function createReply(threadId, data) {
	check(threadId, String);
	check(data, {
		content: String
	});

	// CHECKS
	// user is a member of the group

	// ACTIONS
	// create new thread reply
	// bump reply count of thread

	// find groupId
	const thread = Threads.findOne(threadId, {
		fields: {groupId: 1}
	});

	if ( ! thread) {
		throw new Meteor.Error('bad-data', 'There is no matching thread');
	}

	// check user is in group
	const member = GroupMembers.fetchUsersMember(thread.groupId, justIdField);

	if ( ! member) {
		throw new Meteor.Error('permission-denied', 'You are not a member of this group');
	}

	// create new reply
	ThreadReplies.insert({
		userId: this.userId,
		groupId: thread.groupId,
		content: data.content,
		threadId
	});

	// bump reply count of thread
	Threads.update(threadId, {
		$inc: {replyCount: 1}
	});
}

Meteor.methods({
	'threads.create': createThread,
	'threads.reply': createReply
});

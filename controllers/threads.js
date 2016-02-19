import {GroupMembers, Threads} from 'models';
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

Meteor.methods({
	'threads.create': createThread
});

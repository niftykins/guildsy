import {Groups, GroupMembers, Threads, ThreadReplies} from 'models';
import {justIdField} from 'utils/common';

// publish the latest threads
Meteor.publish('threads.latest', function(url) {
	check(url, String);

	// XXX seems bad to double fetch this
	// perhaps GroupMembers can also have a url field?
	const group = Groups.fetchByUrl(url, justIdField);

	if ( ! group) return null;

	// need to check group membership before sending data
	const member = GroupMembers.fetchMember(group._id, this.userId, justIdField);

	if ( ! member) return null;

	return Threads.find({
		groupId: group._id
	}, {
		fields: {
			userId: 1,
			groupId: 1,
			title: 1,
			replyCount: 1,
			created: 1,
			updated: 1
		},
		sort: {updated: -1}
	});
});

// publish a single thread
Meteor.publish('thread', function(threadId) {
	check(threadId, String);

	const thread = Threads.findOne(threadId, {
		fields: {groupId: 1}
	});

	if ( ! thread) return null;

	// need to check group membership before sending data
	const member = GroupMembers.fetchMember(thread.groupId, this.userId, justIdField);

	if ( ! member) return null;

	const threadCursor = Threads.find(threadId, {
		fields: {
			userId: 1,
			groupId: 1,
			title: 1,
			content: 1,
			editCount: 1,
			created: 1,
			updated: 1
		},
		limit: 1
	});

	const repliesCursor = ThreadReplies.find({threadId}, {
		fields: {
			userId: 1,
			threadId: 1,
			content: 1,
			editCount: 1,
			created: 1,
			updated: 1
		}
	});

	return [
		threadCursor,
		repliesCursor
	];
});

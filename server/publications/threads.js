import {Groups, GroupMembers, Threads} from 'models';
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

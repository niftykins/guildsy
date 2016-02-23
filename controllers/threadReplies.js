import {ThreadReplies, GroupMembers} from 'models';

function editReply(replyId, data) {
	check(replyId, String);
	check(data, {
		content: String
	});

	// CHECKS
	// user can modify the reply

	// ACTIONS
	// update the reply

	// find groupId and owner of reply
	const reply = ThreadReplies.findOne(replyId, {
		fields: {
			groupId: 1,
			userId: 1
		}
	});

	if ( ! reply) {
		throw new Meteor.Error('bad-data', 'There is no matching reply');
	}

	// check user is in group
	const member = GroupMembers.fetchUsersMember(reply.groupId, {
		fields: {isAdmin: 1}
	});

	if ( ! member || ! member.canEditThreadReply(reply)) {
		throw new Meteor.Error('permission-denied', 'You are not allowed to perform this update');
	}

	// update reply
	ThreadReplies.update(replyId, {
		$set: {
			content: data.content
		}
	});
}

Meteor.methods({
	'threadReplies.edit': editReply
});

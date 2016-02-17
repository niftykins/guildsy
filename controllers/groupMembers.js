import _ from '_';
import {GroupMembers} from 'models';

function containsKeys(obj, keys) {
	return _.chain(obj)
		.keys()
		.contains(keys)
		.value();
}

function updateMember(memberId, changes) {
	check(memberId, String);
	check(changes, {
		username: Match.Optional(String)
	});

	// CHECKS
	// user can update member's basic info
	// IF username THEN check username isn't taken

	// ACTIONS
	// update member's properties

	// fetch member being updated
	const member = GroupMembers.findOne(memberId, {
		field: {
			groupId: 1
		}
	});

	if ( ! member) {
		throw new Meteor.Error('bad-data', 'There\'s no matching group member');
	}

	// fetch member doing update
	const user = GroupMembers.fetchUsersMember(member.groupId, {
		fields: {
			isAdmin: 1,
			isOwner: 1
		}
	});

	if ( ! user) {
		throw new Meteor.Error('permission-denied', 'You are not a member of this group');
	}

	// permissions checking
	const needsBasic = containsKeys(changes, ['username']);
	const canBasic = user.canUpdateMemberBasic(memberId);

	if (needsBasic && ! canBasic) {
		throw new Meteor.Error('permission-denied', 'You are not allowed to perform this update');
	}

	const update = {$set: {}};

	// check username is free
	if (changes.username) {
		const free = GroupMembers.checkUsernameAvailability(member.groupId, changes.username);

		if ( ! free) {
			throw new Meteor.Error('bad-data', 'Username is already taken');
		}

		update.$set.username = changes.username;
	}

	GroupMembers.update(memberId, update);
}

Meteor.methods({
	'groupMembers.update': updateMember
});

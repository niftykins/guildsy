import {Groups, PartialGroups, GroupMembers} from 'models';

const justIdField = {fields: {_id: 1}};

function createGroup(partialId) {
	check(partialId, String);

	// CHECKS
	// group url is unique

	// ACTIONS
	// find partial matching partialId
	// create new group
	// create admin group member for owner
	// remove the partial

	const partial = PartialGroups.findOne(partialId);

	if ( ! partial) {
		throw new Meteor.Error('bad-data', 'Missing group data');
	}

	// ensure url is unique
	const match = Groups.findOne({url: partial.url}, justIdField);

	if (match) {
		throw new Meteor.Error('bad-data', 'That group url is taken');
	}

	// create group
	const groupId = Groups.insert({
		ownerId: this.userId,
		name: partial.name,
		url: partial.url,
		memberCount: 1
	});

	// create admin group member for owner
	GroupMembers.insert({
		username: partial.username,
		userId: this.userId,
		isAdmin: true,
		groupId
	});

	// remove the partial
	PartialGroups.remove(partialId);

	// return url for redirection
	return partial.url;
}

function joinGroup(groupId, username) {
	check(groupId, String);
	check(username, String);

	// CHECKS
	// group exists
	// username isn't already taken
	// not already a member

	// ACTIONS
	// create a group member for user

	// check groups exists
	const group = Groups.findOne(groupId, justIdField);

	if ( ! group) {
		throw new Meteor.Error('bad-data', 'No matching group');
	}

	// check username isn't taken
	const match = GroupMembers.findOne({
		username,
		groupId
	}, justIdField);

	if (match) {
		throw new Meteor.Error('bad-data', 'Username is already taken');
	}

	// check user isn't already in the group
	const member = GroupMembers.fetchMember(this.userId, groupId, justIdField);

	if (member) {
		throw new Meteor.Error('bad-data', 'You\'re already a member of this group');
	}

	// create group member
	GroupMembers.insert({
		userId: this.userId,
		isAdmin: false,
		username,
		groupId
	});
}

function fetchExplore() {
	return Groups.find({}, {
		fields: {
			memberCount: 1,
			name: 1,
			url: 1
		}
	}).fetch();
}

Meteor.methods({
	'groups.create': createGroup,
	'groups.join': joinGroup,

	'groups.fetchExplore': fetchExplore
});

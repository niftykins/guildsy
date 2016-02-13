import {Groups, PartialGroups, GroupMembers} from 'models';

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
	const match = Groups.findOne({url: partial.url}, {
		fields: {_id: 1}
	});

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
	'groups.fetchExplore': fetchExplore
});

import {Groups, GroupMembers} from 'models';

Meteor.publish('group.info', (url) => {
	check(url, String);

	return Groups.find({url}, {
		fields: {
			memberCount: 1,
			name: 1,
			url: 1
		},
		limit: 1
	});
});

Meteor.publishComposite('group', (url) => {
	check(url, String);

	// XXX seems bad to double fetch this
	// perhaps GroupMembers can also have a url field?
	const g = Groups.fetchByUrl(url, {
		fields: {_id: 1}
	});

	if ( ! g) return null;

	return {
		// only allow group members to fetch the payload
		// XXX this part *probably* doesn't need to be reactive
		find() {
			return GroupMembers.find({
				userId: this.userId,
				groupId: g._id
			}, {
				fields: {
					groupId: 1,
					username: 1,
					isAdmin: 1
				},
				limit: 1
			});
		},

		children: [{
			// fetch the team in question
			find() {
				return Groups.find({url}, {
					fields: {
						name: 1,
						url: 1
					},
					limit: 1
				});
			},

			children: [{
				// also fetch all the other group members
				find(group) {
					return GroupMembers.find({
						groupId: group._id
					}, {
						groupId: 1,
						username: 1,
						isAdmin: 1
					});
				}
			}]
		}]
	};
});

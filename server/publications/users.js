import {Users, GroupMembers, Groups} from 'models';

Meteor.publishComposite('user', () => {
	return [
		{
			// return extra fields that are on the meteor user
			// XXX currently just overpublishing the whole doc
			find() {
				return Users.find(this.userId, {
					limit: 1
				});
			}
		},

		{
			// find out which groups the user is a member of,
			// by finding each of their members
			find() {
				return GroupMembers.find({
					userId: this.userId
				}, {
					// only need groupId to find the group below
					fields: {
						groupId: 1
					}
				});
			},

			children: [{
				find(member) {
					return Groups.find({
						_id: member.groupId
					}, {
						// only need basic info for the UI
						fields: {
							name: 1,
							url: 1
						}
					});
				}
			}]
		}
	];
});


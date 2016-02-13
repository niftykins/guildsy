import {Groups} from 'models';

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

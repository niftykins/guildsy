import {PartialGroups} from 'models';

Meteor.publish('partial-groups', function() {
	return PartialGroups.find({
		userId: this.userId
	}, {
		limit: 1
	});
});

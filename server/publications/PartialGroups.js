import {PartialGroups} from 'models';

Meteor.publish('partial-group', function() {
	return PartialGroups.find({
		userId: this.userId
	}, {
		limit: 1
	});
});

import {Users} from 'models';

Meteor.publish('user', function() {
	return Users.find({
		userId: this.userId
	}, {
		limit: 1
	});
});

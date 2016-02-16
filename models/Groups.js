import _ from '_';
import SimpleSchema from 'simple-schema';
import createdUpdated from './createdUpdated';

import methodCall from 'utils/methodCall';

const Groups = new Mongo.Collection('groups');
export default Groups;

// XXX probably want an index on url
const schema = new SimpleSchema([createdUpdated, {
	ownerId: {
		type: SimpleSchema.RegEx.Id
	},
	name: {
		type: String
	},
	url: {
		type: String
	},
	memberCount: {
		type: Number,
		defaultValue: 0
	}
}]);

Groups.attachSchema(schema);

_.extend(Groups, {
	fetchByUrl(url, opts = {}) {
		return Groups.findOne({url}, opts);
	}
});

Groups.helpers({
	joinGroup(username, cb) {
		methodCall('groups.join', this._id, username, cb);
	},

	getUrl() {
		return `/g/${this.url}`;
	}
});

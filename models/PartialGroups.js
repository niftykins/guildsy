import _ from '_';
import SimpleSchema from 'simple-schema';
import createdUpdated from './createdUpdated';

import methodCall from 'utils/methodCall';

const PartialGroups = new Mongo.Collection('partial-groups');
export default PartialGroups;

const schema = new SimpleSchema([createdUpdated, {
	userId: {
		type: SimpleSchema.RegEx.Id,
		denyUpdate: true
	},
	name: {
		type: String,
		defaultValue: ''
	},
	url: {
		type: String,
		defaultValue: ''
	},
	username: {
		type: String,
		defaultValue: ''
	}
}]);

PartialGroups.attachSchema(schema);

_.extend(PartialGroups, {
	fetchOrCreatePartial(userId = Meteor.userId()) {
		const partial = this.findOne({userId});

		if (partial) return partial;

		const id = PartialGroups.insert({userId});
		return this.findOne(id);
	}
});

PartialGroups.helpers({
	updateField(field, value) {
		PartialGroups.update(this._id, {
			$set: {[field]: value}
		});
	},

	createGroup(cb) {
		methodCall('groups.create', this._id, cb);
	}
});

if (Meteor.isServer) {
	// XXX probably should confirm these actually do stop bad stuff

	// allowing client side insert and updates
	PartialGroups.allow({
		insert(userId) {
			// block if there's already a partial for them
			if (PartialGroups.findOne({userId})) return false;

			return true;
		},

		update(userId, doc, fields, modifier) {
			if (userId !== doc.userId) return false;

			check(modifier, schema);

			return true;
		}
	});
}

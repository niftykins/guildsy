
import SimpleSchema from 'simple-schema';
import CreatedUpdated from './CreatedUpdated';

const PartialGroups = new Mongo.Collection('partial-groups');
export default PartialGroups;

const schema = new SimpleSchema([CreatedUpdated, {
	userId: {
		type: SimpleSchema.RegEx.Id
	},
	name: {
		type: String
	},
	url: {
		type: String
	},
	username: {
		type: String
	}
}]);

PartialGroups.attachSchema(schema);

PartialGroups.helpers({
	updateField(field, value) {
		PartialGroups.update(this._id, {
			$set: {[field]: value}
		});
	}
});

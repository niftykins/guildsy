import SimpleSchema from 'simple-schema';
import createdUpdated from './createdUpdated';

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

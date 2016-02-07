import SimpleSchema from 'simple-schema';
import CreatedUpdated from './CreatedUpdated';

const Groups = new Mongo.Collection('groups');
export default Groups;

const schema = new SimpleSchema([CreatedUpdated, {
}]);

Groups.attachSchema(schema);

Groups.helpers({
});

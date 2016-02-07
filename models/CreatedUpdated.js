import SimpleSchema from 'simple-schema';

export default new SimpleSchema({
	created: {
		type: Date,
		autoValue() {
			if (this.isInsert) return new Date();
		},
		denyUpdate: true
	},
	updated: {
		type: Date,
		autoValue() {
			if (this.isUpdate) return new Date();
		},
		optional: true
	}
});

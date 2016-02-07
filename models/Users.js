const Users = Meteor.users;
export default Users;

// stop users being able to edit their profile
Users.deny({
	update() {
		return false;
	}
});

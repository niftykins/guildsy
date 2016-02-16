import _ from '_';
import methodCall from 'utils/methodCall';

const ExploreGroups = new Mongo.Collection(null);
export default ExploreGroups;

_.extend(ExploreGroups, {
	fetchExploreGroups() {
		return ExploreGroups.find().fetch();
	},

	updateExploreGroups() {
		methodCall('groups.fetchExplore', (err, result) => {
			if (err) return;

			// clear out chached data
			ExploreGroups.remove({});

			result.forEach((item) => {
				ExploreGroups.insert(item);
			});
		});
	}
});

ExploreGroups.helpers({
	getUrl() {
		return `/g/${this.url}`;
	}
});

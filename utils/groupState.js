import {Groups} from 'models';

const state = new ReactiveDict('group');

let handle;

export function subscribe(groupUrl) {
	handle = Meteor.subscribe('group', groupUrl, {
		onStop() {
			state.set('groupId', null);
			state.set('view', 'general');
		}
	});

	const group = Groups.fetchByUrl(groupUrl);

	if (group) {
		state.set('groupId', group._id);
		state.set('view', 'general');
	}

	return handle;
}

export function getHandle() {
	return handle;
}

export function setSettingsView() {
	state.set('view', 'settings');
}

export function setGeneralView() {
	state.set('view', 'general');
}

export function getState() {
	return state.all();
}

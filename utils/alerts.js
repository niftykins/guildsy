const TYPE = 'type';
const MESSAGE = 'message';
const SHOWN = 'shown';

const alertState = new ReactiveDict('alert');

export function getAlert() {
	return alertState.all();
}

export function hideAlert() {
	alertState.set(SHOWN, false);
}

export function errorAlert(message) {
	alertState.set(TYPE, 'error');
	alertState.set(MESSAGE, message);
	alertState.set(SHOWN, true);
}

export function successAlert(message) {
	alertState.set(TYPE, 'success');
	alertState.set(MESSAGE, message);
	alertState.set(SHOWN, true);
}

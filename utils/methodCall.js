import {errorAlert} from './alerts';

export default function methodCall(methodName, ...args) {
	let cb;

	if (args.length && typeof args[args.length - 1] === 'function') {
		cb = args.pop();
	}

	return Meteor.apply(methodName, args, (err, result) => {
		if (err) errorAlert(err.reason);
		if (cb) cb(err, result);
	});
}

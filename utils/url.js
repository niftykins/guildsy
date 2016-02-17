import {browserHistory} from 'react-router';

let location;

browserHistory.listen((l) => {
	location = l;

	if (process.env.NODE_ENV !== 'production') {
		window.routerLocation = l;
	}
});

export function relativeLink(to) {
	let newTo = `${location.pathname}/${to}`;
	newTo = newTo.replace('//', '/');

	return newTo;
}

export function replaceLastSegment(to) {
	let p = location.pathname;

	// remove trailing /
	if (p.length > 1 && p[p.length - 1] === '/') {
		p = p.slice(0, -1);
	}

	const index = p.lastIndexOf('/');
	const path = p.substr(0, index);

	let newTo = `${path}/${to}`;
	newTo = newTo.replace('//', '/');

	return newTo;
}

import {browserHistory} from 'react-router';

let location;

browserHistory.listen((l) => {
	location = l;

	if (process.env.NODE_ENV !== 'production') {
		window.routerLocation = l;
	}
});

export function relativeLink(to) {
	const path = `${location.pathname}/${to}`;

	return path.replace('//', '/');
}

export function replaceLastSegment(to) {
	let p = location.pathname;

	// remove trailing /
	if (p.length > 1 && p[p.length - 1] === '/') {
		p = p.slice(0, -1);
	}

	const index = p.lastIndexOf('/');
	let path = p.substr(0, index);

	if (to) path += `/${to}`;

	return path.replace('//', '/');
}

export function removeLastSegment() {
	return replaceLastSegment();
}

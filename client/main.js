import _ from '_';

import './routes';
import './styles/base.styl';

function globalify(obj) {
	_.each(obj, (value, key) => {
		window[key] = value;
	});
}

if (process.env.NODE_ENV !== 'production') {
	globalify(require('models'));
	globalify(require('models/client'));
}

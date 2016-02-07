import _ from '_';

import './routes';
import './styles/base.styl';

if (process.env.NODE_ENV !== 'production') {
	const models = require('models');

	_.each(models, (value, key) => {
		window[key] = value;
	});
}

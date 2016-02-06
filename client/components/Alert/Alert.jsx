import {Component} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';
import classnames from 'classnames';

import {getAlert, hideAlert} from 'utils/alerts';

const ALERT_DURATION = 5000;

@ReactMixin.decorate(ReactMeteorData)
export default class Alert extends Component {
	getMeteorData() {
		const {message, type, shown} = getAlert();

		clearTimeout(this._timer);

		if (message && shown) {
			this._timer = setTimeout(() => {
				hideAlert();
			}, ALERT_DURATION);
		}

		return {message, type, shown};
	}

	render() {
		const {message, type, shown} = this.data;

		const alertClassName = classnames({
			visible: shown
		}, 'alert-banner', type);

		return (
			<div className={alertClassName}>
				{message}
			</div>
		);
	}
}

import {Component} from 'react';

import Name from './Name';
import Url from './Url';
import Username from './Username';
import Confirm from './Confirm';

const STEP_COUNT = 4;

export default class CreateGroup extends Component {
	state = {
		name: '',
		url: '',
		username: ''
	};

	onUpdateState = (field, value) => {
		this.setState({[field]: value});
	};

	renderStepper(step) {
		const bullets = [];

		for (let i = 0; i < STEP_COUNT; i++) {
			bullets.push(
				<span key={i} className={i === (step - 1) ? 'active' : ''}>
					&#8226;
				</span>
			);
		}

		return (
			<div className="bullets">
				{bullets}
			</div>
		);
	}

	render() {
		const {name, url, username} = this.state;
		let View = Confirm;
		let step = 4;

		if ( ! name) {
			View = Name;
			step = 1;
		} else if ( ! url) {
			View = Url;
			step = 2;
		} else if ( ! username) {
			View = Username;
			step = 3;
		}

		return (
			<View
				onUpdateState={this.onUpdateState}
				stepper={this.renderStepper(step)}
				{...this.state}
			/>
		);
	}
}

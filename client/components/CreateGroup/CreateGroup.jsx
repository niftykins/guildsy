import {Component} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';
import {browserHistory} from 'react-router';

import Name from './Name';
import Url from './Url';
import Username from './Username';
import Confirm from './Confirm';

import {PartialGroups} from 'models';

const STEP_COUNT = 4;

@ReactMixin.decorate(ReactMeteorData)
export default class CreateGroup extends Component {
	getMeteorData() {
		if (Meteor.subscribe('partial-group').ready()) {
			const partial = PartialGroups.fetchOrCreatePartial();
			return {partial};
		}

		return {isLoading: true};
	}

	onUpdateGroup = (field, value) => {
		this.data.partial.updateField(field, value);
	}

	onCreateGroup = () => {
		this.data.partial.createGroup((err, groupUrl) => {
			if ( ! err) browserHistory.push(`/g/${groupUrl}`);
		});
	}

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
		if (this.data.isLoading) return null;

		const {name, url, username} = this.data.partial;
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
				onUpdateGroup={this.onUpdateGroup}
				onCreateGroup={this.onCreateGroup}
				stepper={this.renderStepper(step)}
				{...this.data.partial}
			/>
		);
	}
}

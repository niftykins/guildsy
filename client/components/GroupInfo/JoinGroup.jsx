import {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {checkRefsForDisabled} from 'utils/client';

import Input from '../Utils/Input';

export default class JoinGroup extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired
	};

	state = {
		disabled: true
	};

	onSubmit = (e) => {
		e.preventDefault();

		const username = this.refs.input.getValue();

		if ( ! username) return;

		this.props.onSubmit(username);
	};

	render() {
		const buttonClassName = classnames({
			disabled: this.state.disabled
		}, 'green button');

		return (
			<form onSubmit={this.onSubmit}>
				<h1>Join this group</h1>

				<p className="description">
					Your username will be how you identify yourself to your other group members.
				</p>

				<Input
					className="margin-bottom"
					ref="input"
					type="text"
					label="Username"
					onChange={checkRefsForDisabled.bind(this)}
				/>

				<button
					className={buttonClassName}
					type="submit"
				>
					Join Group
				</button>
			</form>
		);
	}
}

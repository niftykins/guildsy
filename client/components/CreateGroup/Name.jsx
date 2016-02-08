import {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {checkRefsForDisabled} from 'utils/client';

import Input from '../Utils/Input';

export default class Name extends Component {
	static propTypes = {
		onUpdateGroup: PropTypes.func.isRequired,
		stepper: PropTypes.node
	};

	state = {
		disabled: true
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onUpdateGroup('name', this.refs.input.getValue());
	};

	render() {
		const buttonClassName = classnames({
			disabled: this.state.disabled
		}, 'green button');

		return (
			<div className="page-container">
				<div className="split-screen">
					<div className="split-pane-left">
						<form
							className="split-pane-flex-wrapper"
							onSubmit={this.onSubmit}
						>
							<div className="brand">guildsy</div>

							<div className="form-body">
								<h1>What do you want to call your guildsy group?</h1>

								<p className="description">
									Name your group after the group that will be using guildsy together.
								</p>

								<Input
									ref="input"
									type="text"
									label="Your group name"
									labelHint="(you can change this later)"
									placeholder="Ex. Samurai Pizza Penguins"
									autoFocus={true}
									onChange={checkRefsForDisabled.bind(this)}
								/>
							</div>

							<div className="controls">
								<button
									className={buttonClassName}
									type="submit"
								>
									Next
								</button>

								{this.props.stepper}
							</div>
						</form>
					</div>

					<RightSide />
				</div>
			</div>
		);
	}
}

function RightSide() {
	const style = {
		backgroundImage: 'url("/images/unicorn.gif")'
	};

	return (
		<div className="split-pane-right unicorn-pane">
			<div className="image" style={style} />
		</div>
	);
}

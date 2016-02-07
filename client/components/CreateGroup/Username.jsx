import {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {checkRefsForDisabled} from 'utils/client';

import Input from '../Utils/Input';

export default class Username extends Component {
	static propTypes = {
		onUpdateState: PropTypes.func.isRequired,
		stepper: PropTypes.node
	};

	state = {
		disabled: true
	};

	onSubmit = (e) => {
		e.preventDefault();

		this.props.onUpdateState('username', this.refs.input.getValue());
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
								<h1>Pick a username</h1>

								<p className="description">
									Your username should be something that the other group members would recognize.
								</p>

								<Input
									ref="input"
									type="text"
									label="Username"
									autoFocus={true}
									onChange={checkRefsForDisabled.bind(this)}
								/>
							</div>

							<div className="controls">
								<button
									className={buttonClassName}
									type="submit"
								>
									Finish
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

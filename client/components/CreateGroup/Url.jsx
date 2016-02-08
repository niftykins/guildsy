import {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {checkRefsForDisabled} from 'utils/client';

import Input from '../Utils/Input';

export default class Url extends Component {
	static propTypes = {
		name: PropTypes.string,
		onUpdateGroup: PropTypes.func.isRequired,
		stepper: PropTypes.node
	};

	state = {
		disabled: false
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onUpdateGroup('url', this.refs.input.getValue());
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
								<h1>
									What web address do you want for your guildsy group?
								</h1>

								<p className="description">
									This is the address used for your group homepage.
								</p>

								<Input
									ref="input"
									type="text"
									label="Your web address"
									labelHint="(letters, numbers and dashes only)"
									defaultValue={this.props.name}
									showUrlMask={true}
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

import {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {checkRefsForDisabled} from 'utils/client';

import Input from '../Utils/Input';

export default class Confirm extends Component {
	static propTypes = {
		name: PropTypes.string,
		url: PropTypes.string,
		username: PropTypes.string,
		onUpdateState: PropTypes.func.isRequired,
		stepper: PropTypes.node
	};

	state = {
		disabled: false
	};

	onSubmit = (e) => {
		e.preventDefault();
	};

	render() {
		const {name, url, username} = this.props;

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
								<h1>Confirm your group details</h1>

								<Input
									ref="input"
									type="text"
									label="Your group name"
									defaultValue={name}
									placeholder="Ex. Samurai Pizza Penguins"
									onChange={checkRefsForDisabled.bind(this)}
								/>

								<Input
									ref="input"
									type="text"
									label="Your web address"
									defaultValue={url}
									showUrlMask={true}
									onChange={checkRefsForDisabled.bind(this)}
								/>

								<Input
									ref="input"
									type="text"
									label="Username"
									defaultValue={username}
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

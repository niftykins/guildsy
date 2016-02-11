import {Component} from 'react';
import classnames from 'classnames';
import {browserHistory} from 'react-router';

import {errorAlert} from 'utils/alerts';
import {checkRefsForDisabled} from 'utils/client';

import Input from '../Utils/Input';

export default class CreateAccount extends Component {
	state = {
		disabled: true
	};

	constructor(props) {
		super(props);

		Meteor.logout();
	}

	onSubmit = (e) => {
		e.preventDefault();

		const email = this.refs.email.getValue();
		const password = this.refs.password.getValue();

		if ( ! email || ! password) {
			return errorAlert('All fields are required');
		}

		Accounts.createUser({email, password}, (err) => {
			if (err) return errorAlert(err.reason);

			browserHistory.push('/');
		});
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
								<h1>Join guildsy</h1>

								<Input
									ref="email"
									type="text"
									label="Email address"
									placeholder="Email address"
									autoFocus={true}
									onChange={checkRefsForDisabled.bind(this)}
								/>

								<Input
									ref="password"
									type="password"
									label="Password"
									placeholder="Password"
									onChange={checkRefsForDisabled.bind(this)}
								/>
							</div>

							<div className="controls">
								<button
									className={buttonClassName}
									type="submit"
								>
									Create Account
								</button>
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

import {Component, PropTypes} from 'react';
import {errorAlert} from 'utils/alerts';

export default class SignIn extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	onSubmit = (e) => {
		e.preventDefault();

		const email = this.refs.email.value;
		const password = this.refs.password.value;

		if ( ! email || ! password) {
			return errorAlert('All fields are required');
		}

		Meteor.loginWithPassword(email, password, (err) => {
			if (err) {
				return errorAlert(err.reason);
			}

			const {location, history} = this.props;
			const loc = (location.state && location.state.pathname) || '/';

			history.push(loc);
		});
	};

	render() {
		return (
			<div className="bg-grey page-container">
				<div className="max-container">
					<div className="card-container align-center col-4-6 huge-padding-bottom">
						<h1>Sign in to guildsy</h1>

						<p>
							Enter your <strong>email address</strong> and <strong>password</strong>.
						</p>

						<form
							onSubmit={this.onSubmit}
							className="margin-auto col-4-6"
						>
							<input
								className="input"
								ref="email"
								type="text"
								placeholder="Email Address"
							/>

							<input
								className="input margin-bottom"
								ref="password"
								type="password"
								placeholder="Password"
							/>

							<button
								className="fluid green button"
								type="submit"
							>
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

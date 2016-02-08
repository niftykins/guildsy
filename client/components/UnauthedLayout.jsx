import {Component, PropTypes} from 'react';
import Alert from './Alert/Alert';

export default class UnauthedLayout extends Component {
	static propTypes = {
		children: PropTypes.node
	};

	render() {
		return (
			<div className="app">
				<Alert />

				{this.props.children}
			</div>
		);
	}
}

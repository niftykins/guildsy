import {Component, PropTypes} from 'react';
import {relativeLink} from 'utils/url';
import {Link} from 'react-router';

export default class RelativeLink extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		to: PropTypes.string.isRequired
	}

	render() {
		const {to, children, ...props} = this.props;

		return (
			<Link
				to={relativeLink(to)}
				{...props}
			>
				{children}
			</Link>
		);
	}
}

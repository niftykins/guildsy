import {Component, PropTypes} from 'react';

export default class App extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		params: PropTypes.object.isRequired,
		children: PropTypes.node
	};

	render() {
		return (
			<div className="app">
				<div className="button">button</div>
				<div className="outline button">button</div>
				<div className="small green button">green</div>
				<div className="small disabled button">disabled</div>

				{this.props.children}
			</div>
		);
	}
}

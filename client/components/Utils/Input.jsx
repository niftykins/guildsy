import {Component, PropTypes} from 'react';

export default class Input extends Component {
	static propTypes = {
		type: PropTypes.string,
		placeholder: PropTypes.string,
		label: PropTypes.string
	};

	static defaultProps = {
		type: 'text',
		placeholder: ''
	};

	constructor(props) {
		super(props);

		this.id = Random.id();
	}

	getValue() {
		return this.refs.input.value;
	}

	render() {
		const {type, placeholder, label, ...props} = this.props;

		return (
			<div className="input-group">
				{label &&
					<label htmlFor={this.id}>
						{label}
					</label>
				}

				<input
					id={this.id}
					className="input"
					type={type}
					ref="input"
					placeholder={placeholder}
					{...props}
				/>
			</div>
		);
	}
}

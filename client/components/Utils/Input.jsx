import {Component, PropTypes} from 'react';

export default class Input extends Component {
	static propTypes = {
		type: PropTypes.string,
		placeholder: PropTypes.string,
		label: PropTypes.string,
		labelHint: PropTypes.string,
		showUrlMask: PropTypes.bool,
		onChange: PropTypes.func,
		value: PropTypes.string,
		defaultValue: PropTypes.string
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

	onInputChange = (e) => {
		const value = this.getValue();

		if (this.refs.mask) this.refs.mask.innerHTML = value;
		if (this.props.onChange) this.props.onChange(e);
	};

	render() {
		const {
			type,
			placeholder,
			label,
			labelHint,
			showUrlMask,
			onChange,
			...props
		} = this.props;

		const hint = labelHint && (
			<span className="hint">
				{labelHint}
			</span>
		);

		const onInputChange = showUrlMask ? this.onInputChange : onChange;

		return (
			<div className="input-group">
				{label &&
					<label htmlFor={this.id}>
						{label}	{hint}
					</label>
				}

				<div className="input-wrapper">
					{showUrlMask &&
						<div className="input-mask" ref="mask">
							{this.props.value || this.props.defaultValue}
						</div>
					}

					<input
						id={this.id}
						className="input"
						type={type}
						ref="input"
						placeholder={placeholder}
						onChange={onInputChange}
						{...props}
					/>
				</div>
			</div>
		);
	}
}

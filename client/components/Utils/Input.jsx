import {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class Input extends Component {
	static propTypes = {
		type: PropTypes.string,
		placeholder: PropTypes.string,
		label: PropTypes.string,
		labelHint: PropTypes.string,
		showUrlMask: PropTypes.bool,
		onChange: PropTypes.func,
		value: PropTypes.string,
		defaultValue: PropTypes.string,
		className: PropTypes.string,
		uneditable: PropTypes.bool
	}

	static defaultProps = {
		type: 'text',
		placeholder: ''
	}

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
	}

	renderInput() {
		const {
			type,
			onChange,
			placeholder,
			showUrlMask,

			// exclude this from getting into props
			className,
			...props
		} = this.props;

		const onInputChange = showUrlMask ? this.onInputChange : onChange;

		return (
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
		);
	}

	renderUneditable() {
		return (
			<div className="input uneditable">
				{this.props.value || this.props.defaultValue}
			</div>
		);
	}

	render() {
		const {
			label,
			labelHint,
			className,
			uneditable
		} = this.props;

		const hint = labelHint && (
			<span className="hint">
				{labelHint}
			</span>
		);

		const inputGroupClassName = classnames(className, 'input-group');

		return (
			<div className={inputGroupClassName}>
				{label &&
					<label htmlFor={this.id}>
						{label}	{hint}
					</label>
				}

				{uneditable ? this.renderUneditable() : this.renderInput()}
			</div>
		);
	}
}

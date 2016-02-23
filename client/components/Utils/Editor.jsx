import {Component} from 'react';

export default class Editor extends Component {
	getValue() {
		return this.refs.content.value;
	}

	clearValue() {
		this.refs.content.value = '';
	}

	setValue(value) {
		this.refs.content.value = value;
	}

	focus() {
		this.refs.content.focus();
	}

	render() {
		const {...props} = this.props;

		return (
			<div className="editor">
				<textarea
					ref="content"
					{...props}
				/>
			</div>
		);
	}
}

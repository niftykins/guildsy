import {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {checkRefsForDisabled} from 'utils/client';

import Editor from '../Utils/Editor';

export default class ThreadEditor extends Component {
	static propTypes = {
		thread: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);

		this.state = {
			hidden: true,
			disabled: true
		};
	}

	toggleEditorArea = () => {
		const hidden = !this.state.hidden;

		this.setState({hidden});

		if ( ! hidden) {
			this.refs.editor.focus();
		}
	}

	onSubmit = () => {
		const content = this.refs.editor.getValue();

		if ( ! content) return;

		const data = {content};

		this.props.thread.createReply(data, (err) => {
			if ( ! err) {
				this.setState({hidden: true});
				this.refs.editor.clearValue();
			}
		});
	}

	render() {
		const editorClassName = classnames({
			hidden: this.state.hidden
		}, 'thread-editor');

		const buttonClassName = classnames({
			disabled: this.state.disabled
		}, 'green button');

		return (
			<div className={editorClassName}>
				<Editor
					ref="editor"
					placeholder="Type your reply here"
					onChange={checkRefsForDisabled.bind(this)}
				/>

				<div className="button-group">
					<div
						className="outline button"
						onClick={this.toggleEditorArea}
					>
						Cancel
					</div>

					<div
						className={buttonClassName}
						onClick={this.onSubmit}
					>
						Create Reply
					</div>
				</div>
			</div>
		);
	}
}

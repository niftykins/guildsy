import {Component, PropTypes} from 'react';
import classnames from 'classnames';

import {checkRefsForDisabled} from 'utils/client';

import Editor from '../Utils/Editor';

export default class ThreadEditor extends Component {
	static propTypes = {
		thread: PropTypes.object.isRequired,
		editReply: PropTypes.object
	}

	constructor(props) {
		super(props);

		this.state = {
			hidden: true,
			disabled: true,
			editId: null
		};
	}

	toggleEditorArea = () => {
		const hidden = !this.state.hidden;

		this.setState({hidden});

		if ( ! hidden) {
			this.refs.editor.focus();
		}
	}

	editReply(reply) {
		this.setState({
			hidden: false,
			disabled: false,
			editReply: reply
		});

		this.refs.editor.setValue(reply.content);
	}

	onSubmitEdit(data) {
		this.state.editReply.edit(data, (err) => {
			if ( ! err) {
				this.setState({hidden: true});
				this.refs.editor.clearValue();
			}
		});
	}

	onSubmitReply(data) {
		this.props.thread.createReply(data, (err) => {
			if ( ! err) {
				this.setState({hidden: true});
				this.refs.editor.clearValue();
			}
		});
	}

	onSubmit = () => {
		const content = this.refs.editor.getValue();

		if ( ! content) return;

		const data = {content};

		if (this.state.editReply) this.onSubmitEdit(data);
		else this.onSubmitReply(data);
	}

	onCancel = () => {
		this.setState({
			hidden: true,
			editReply: null
		});

		this.refs.editor.clearValue();
	}

	render() {
		const {hidden, disabled, editReply} = this.state;

		const editorClassName = classnames({hidden}, 'thread-editor');
		const buttonClassName = classnames({disabled}, 'green button');

		return (
			<div className={editorClassName}>
				<ActionBar
					editReply={editReply}
					onCloseEditor={this.toggleEditorArea}
				/>

				<Editor
					ref="editor"
					placeholder="Type your reply here"
					onChange={checkRefsForDisabled.bind(this)}
				/>

				<div className="button-group">
					<div
						className="outline button"
						onClick={this.onCancel}
					>
						Cancel
					</div>

					<div
						className={buttonClassName}
						onClick={this.onSubmit}
					>
						{editReply ? 'Edit Reply' : 'Create Reply'}
					</div>
				</div>
			</div>
		);
	}
}


function ActionBar({editReply, onCloseEditor}) {
	return (
		<div className="editor-action">
			<div className="action">
				{editReply ? 'Editing Reply' : 'Creating Reply'}
			</div>

			<i
				className="material-icons toggle-icon"
				onClick={onCloseEditor}
			>
				keyboard_arrow_down
			</i>
		</div>
	);
}

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
		this.setState({hidden: !this.state.hidden});
	}

	onSubmit = () => {
		const content = this.refs.content.getValue();

		if ( ! content) return;

		const data = {content};

		this.props.thread.createReply(data, (err) => {
			if ( ! err) {
				this.setState({hidden: true});
				this.refs.content.clearValue();
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
					ref="content"
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

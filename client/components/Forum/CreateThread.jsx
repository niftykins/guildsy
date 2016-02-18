import {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Link, browserHistory} from 'react-router';

import {replaceLastSegment, removeLastSegment} from 'utils/url';
import {checkRefsForDisabled} from 'utils/client';
import {getState} from 'utils/groupState';

import Input from '../Utils/Input';
import Editor from '../Utils/Editor';

import {Threads} from 'models';

export default class CreateThread extends Component {
	static propTypes = {
		params: PropTypes.object.isRequired
	}

	state = {
		disabled: true
	}

	onSubmit = () => {
		const title = this.refs.title.getValue();
		const content = this.refs.content.getValue();

		if ( ! title || ! content) return;

		const {groupId} = getState();
		const data = {title, content};

		Threads.createThread(groupId, data, (err, threadId) => {
			if (err) return;

			const url = replaceLastSegment(`/t/${threadId}`);
			browserHistory.push(url);
		});
	}

	render() {
		const buttonClassName = classnames({
			disabled: this.state.disabled
		}, 'green button');

		return (
			<div className="page-container">
				<div className="create-thread">
					<h1>Create Thread</h1>

					<Input
						ref="title"
						placeholder="What is this discussion about?"
						label="Discussion Title"
						onChange={checkRefsForDisabled.bind(this)}
						autoFocus={true}
					/>

					<Editor
						ref="content"
						placeholder="Type your thread content here"
						onChange={checkRefsForDisabled.bind(this)}
					/>

					<div className="button-group">
						<Link
							className="outline button"
							to={removeLastSegment()}
						>
							Cancel
						</Link>

						<div
							className={buttonClassName}
							onClick={this.onSubmit}
						>
							Create Thread
						</div>
					</div>
				</div>
			</div>
		);
	}
}

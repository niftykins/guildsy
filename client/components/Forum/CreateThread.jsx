import {Component} from 'react';
import classnames from 'classnames';

import {removeLastSegment} from 'utils/url';
import {checkRefsForDisabled} from 'utils/client';

import {Link} from 'react-router';
import Input from '../Utils/Input';
import Editor from '../Utils/Editor';

export default class CreateThread extends Component {
	state = {
		disabled: true
	}

	onSubmit = () => {

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

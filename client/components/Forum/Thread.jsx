import {Component, PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import ThreadEditor from './ThreadEditor';
import Post from './Post';

import {Threads} from 'models';

@ReactMixin.decorate(ReactMeteorData)
export default class Thread extends Component {
	static propTypes = {
		params: PropTypes.object.isRequired
	}

	getMeteorData() {
		const {threadId} = this.props.params;

		if (Meteor.subscribe('thread', threadId).ready()) {
			const thread = Threads.fetchWithAuthor(threadId);
			const posts = thread.fetchRepliesWithAuthors();

			// push the OP into posts list
			posts.unshift(thread);

			return {thread,	posts};
		}

		return {isLoading: true};
	}

	onEditReply = (reply) => {
		this.refs.editor.editReply(reply);
	}

	renderPosts() {
		const posts = this.data.posts.map((post) => {
			return (
				<Post
					key={post._id}
					post={post}
					onEditReply={this.onEditReply}
				/>
			);
		});

		return (
			<div className="thread-posts">
				{posts}
			</div>
		);
	}

	render() {
		const {isLoading, thread} = this.data;

		if (isLoading) return null;

		return (
			<div className="page-container">
				<div className="thread-page">
					<div className="thread-content">
						<h1>{thread.title}</h1>

						{this.renderPosts()}

						<div className="button-group">
							<div
								className="blue button"
								onClick={() => this.refs.editor.toggleEditorArea()}
							>
								Reply
							</div>
						</div>
					</div>

					<ThreadEditor
						ref="editor"
						thread={thread}
					/>
				</div>
			</div>
		);
	}
}

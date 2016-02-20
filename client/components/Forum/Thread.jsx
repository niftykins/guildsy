import {Component, PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import TimeAgo from '../Utils/TimeAgo';
import ProfileLink from '../Utils/ProfileLink';
import ThreadEditor from './ThreadEditor';

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

			return {thread, posts};
		}

		return {isLoading: true};
	}

	renderPosts() {
		const posts = this.data.posts.map((post) => {
			return <Post key={post._id} post={post} />;
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

					<ThreadEditor
						ref="editor"
						thread={thread}
					/>
				</div>
			</div>
		);
	}
}

function Post({post}) {
	return (
		<div className="thread-post">
			<img src="https://placehold.it/50x50" />

			<div className="post-container">
				<div className="details">
					<ProfileLink member={post.author} />

					<span className="stats">
						<TimeAgo date={post.created} />
					</span>
				</div>

				<div className="content">
					{post.content}
				</div>
			</div>
		</div>
	);
}

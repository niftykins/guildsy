import {Link} from 'react-router';
import TimeAgo from '../Utils/TimeAgo';
import ProfileLink from '../Utils/ProfileLink';

export default function Post({post, onEditReply}) {
	return (
		<div className="thread-post">
			<img src="https://placehold.it/50x50" />

			<div className="post-container">
				<div className="details">
					<ProfileLink member={post.author} />

					<span className="stats">
						<TimeAgo date={post.created} />
					</span>

					<EditButton
						post={post}
						onEditReply={onEditReply}
					/>
				</div>

				<div className="content">
					{post.content}
				</div>
			</div>
		</div>
	);
}

function EditButton({post, onEditReply}) {
	const isReply = !post.title;

	const icon = (
		<i className="material-icons">
			mode_edit
		</i>
	);

	if (isReply) {
		return (
			<span
				className="edit-icon"
				onClick={onEditReply.bind(null, post)}
			>
				{icon}
			</span>
		);
	}

	return (
		<Link
			className="edit-icon"
			to={`/`}
		>
			{icon}
		</Link>
	);
}

import {Link} from 'react-router';

import TimeAgo from '../Utils/TimeAgo';
import ProfileLink from '../Utils/ProfileLink';

export default function ThreadList({threads}) {
	const items = threads.map((thread) => {
		return <ThreadItem key={thread._id} thread={thread} />;
	});

	return (
		<div className="thread-list">
			{items}
		</div>
	);
}

function ThreadItem({thread}) {
	return (
		<div className="thread-item">
			<img src="https://placehold.it/50x50" />

			<div className="info">
				<Link
					className="title"
					to={thread.getUrl()}
				>
					{thread.title}
				</Link>

				<div className="details">
					posted by <ProfileLink member={thread.author} /> <TimeAgo date={thread.created} />
				</div>
			</div>
		</div>
	);
}

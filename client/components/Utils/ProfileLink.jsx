import {Link} from 'react-router';

export default function ProfileLink({member}) {
	return (
		<Link
			className="profile-link"
			to={member.getUrl()}
		>
			{member.username}
		</Link>
	);
}

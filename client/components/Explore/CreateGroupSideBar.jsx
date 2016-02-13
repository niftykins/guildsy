import {Link} from 'react-router';

export default function CreateGroupSideBar() {
	return (
		<div className="page-container create-group-side-bar">
			<Link to="/create-group">
				Some text about being able to create groups when you click on this
			</Link>
		</div>
	);
}

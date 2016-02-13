import Explore from './Explore';
import CreateGroupSideBar from './CreateGroupSideBar';

export default function ExplorePage() {
	return (
		<div className="page-container flex-display">
			<Explore />
			<CreateGroupSideBar />
		</div>
	);
}

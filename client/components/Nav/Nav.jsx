import GroupPicker from './GroupPicker';
import Menu from './Menu';

export default function Nav({params}) {
	return (
		<div className="nav">
			<GroupPicker />

			<Menu groupUrl={params.groupUrl} />
		</div>
	);
}

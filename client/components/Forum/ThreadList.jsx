export default function Threads({threads}) {
	const items = threads.map((thread) => {
		return <Thread key={thread._id} thread={thread} />;
	});

	return (
		<div className="thread-list">
			{items}
		</div>
	);
}

function Thread() {
	return (
		<div className="thread-item">
			Thread
		</div>
	);
}

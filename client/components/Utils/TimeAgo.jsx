import ReactTimeago from 'react-timeago';

function formatter(value, unit, suffix) {
	// don't want to show specific seconds
	if (unit === 'second') {
		return 'a few seconds ago';
	}

	if (value !== 1) unit += 's';

	return `${value} ${unit} ${suffix}`;
}

export default function TimeAgo(props) {
	return (
		<ReactTimeago
			minPeriod={30000}
			formatter={formatter}
			{...props}
		/>
	);
}

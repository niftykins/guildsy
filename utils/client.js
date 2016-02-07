import _ from '_';

export function checkRefsForDisabled() {
	let disabled = false;

	_.some(this.refs, (ref) => {
		if ( ! ref.getValue()) {
			disabled = true;
			return true;
		}
	});

	if (disabled !== this.state.disabled) {
		this.setState({disabled});
	}
}

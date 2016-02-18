import {Component} from 'react';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import ThreadList from './ThreadList';

@ReactMixin.decorate(ReactMeteorData)
export default class AllThreads extends Component {
	getMeteorData() {
		return {threads: []};
	}

	render() {
		return <ThreadList threads={this.data.threads} />;
	}
}

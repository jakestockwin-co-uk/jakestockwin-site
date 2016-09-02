import React from 'react';
import { Card } from 'elemental';

export const Service = React.createClass({
	getInitialState: function () {
		return ({
			name: 'loading...',
			description: 'Please wait while we load the information...',
		});
	},
	componentWillMount: function () {
		this.update(this.props.id);

	},
	componentWillReceiveProps (nextProps) {
		if (nextProps.id !== this.props.id) {
			this.update(nextProps.id);
		}
	},
	shouldComponentUpdate: function (nextProps, nextState) {
		// Component should only update if the id has changed (in which case it needs to load a new service)
		// or if the state has changed, since it needs to re-load once the data has updated.
		return nextProps.id !== this.props.id || nextState.name !== this.state.name;
	},
	componentWillUnmount: function () {
		this.serviceRequest.abort();
	},
	update: function (id) {
		this.serviceRequest = $.get('/api/services/' + id, function (result) {
			this.setState(result);
		}.bind(this));
	},
	render: function () {
		return (
			<div className="service">
				<Card>
					<h3>{this.state.name}</h3>
					<div dangerouslySetInnerHTML={{ __html: this.state.description }}/>
				</Card>
			</div>
		);
	},
});

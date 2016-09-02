import React from 'react';
import { Card } from 'elemental';

export const Profile = React.createClass({
	getInitialState: function () {
		return ({
			name: 'loading...',
			client: '',
			url: '',
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
		// Component should only update if the id has changed (in which case it needs to load a new profile)
		// or if the state has changed, since it needs to re-load once the data has updated.
		return nextProps.id !== this.props.id || nextState.name !== this.state.name;
	},
	componentWillUnmount: function () {
		this.profileRequest.abort();
	},
	update: function (id) {
		this.profileRequest = $.get('/api/profiles/' + id, function (result) {
			this.setState(result);
		}.bind(this));
	},
	render: function () {
		return (
			<div className="profile">
				<Card>
					<h3>{this.state.name}</h3>
					<p>{this.state.position}</p>
					<div dangerouslySetInnerHTML={{ __html: this.state.description }}/>
				</Card>
			</div>
		);
	},
});

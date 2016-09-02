import React from 'react';
import { Card } from 'elemental';

export const Portfolio = React.createClass({
	getInitialState: function () {
		return ({ data: {
			name: 'loading...',
			client: '',
			url: '',
			description: 'Please wait while we load the information...',
		},
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
		// Component should only update if the id has changed (in which case it needs to load a new portfolio)
		// or if the state has changed, since it needs to re-load once the data has updated.
		return nextProps.id !== this.props.id || nextState.data.name !== this.state.data.name;
	},
	componentWillUnmount: function () {
		this.portfolioRequest.abort();
	},
	update: function (id) {
		this.portfolioRequest = $.get('/api/portfolios/' + id, function (result) {
			this.setState({ data: result });
		}.bind(this));
	},
	render: function () {
		return (
			<div className="portfolio cardContainer">
				<Card>
					<h3>{this.state.data.name}</h3>
					<a href={this.state.data.url} target="_blank">{this.state.data.url}</a>
					<div dangerouslySetInnerHTML={{ __html: this.state.data.description }}/>
				</Card>
			</div>
		);
	},
});

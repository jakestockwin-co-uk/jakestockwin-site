import React from 'react';
import { Card } from 'elemental';

export const Portfolio = React.createClass({
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
		return nextProps.id !== this.props.id || nextState.name !== this.state.name;
	},
	componentWillUnmount: function () {
		this.portfolioRequest.abort();
	},
	update: function (id) {
		this.portfolioRequest = $.get('/api/portfolios/' + id, function (result) {
			this.setState(result);
		}.bind(this));
	},
	render: function () {
		return (
			<div className="portfolio">
				<Card>
					<h3>{this.state.name}</h3>
					<a href={this.state.url} target="_blank">{this.state.url}</a>
					<div dangerouslySetInnerHTML={{ __html: this.state.description }}></div>
				</Card>
			</div>
		);
	},
});

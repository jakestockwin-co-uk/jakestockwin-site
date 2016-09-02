import React from 'react';
import { Card } from 'elemental';

export const Testimonial = React.createClass({
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
		// Component should only update if the id has changed (in which case it needs to load a new testimonial)
		// or if the state has changed, since it needs to re-load once the data has updated.
		return nextProps.id !== this.props.id || nextState.name !== this.state.name;
	},
	componentWillUnmount: function () {
		this.testimonialRequest.abort();
	},
	update: function (id) {
		this.testimonialRequest = $.get('/api/testimonials/' + id, function (result) {
			this.setState(result);
		}.bind(this));
	},
	render: function () {
		return (
			<div className="testimonial">
				<Card>
					<h3>{this.state.name}</h3>
					<p>Client: {this.state.company}</p>
					<p>Left at: {this.state.time}</p>
					<div dangerouslySetInnerHTML={{ __html: this.state.testimonial }}></div>
				</Card>
			</div>
		);
	},
});

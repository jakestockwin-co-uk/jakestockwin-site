import React from 'react';
import moment from 'moment';

export const Testimonial = React.createClass({
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
		// Component should only update if the id has changed (in which case it needs to load a new testimonial)
		// or if the state has changed, since it needs to re-load once the data has updated.
		return nextProps.id !== this.props.id || nextState.data.name !== this.state.data.name;
	},
	componentWillUnmount: function () {
		this.testimonialRequest.abort();
	},
	update: function (id) {
		this.testimonialRequest = $.get('/api/testimonials/' + id, function (result) {
			this.setState({ data: result });
		}.bind(this));
	},
	render: function () {
		return (
			<div className="testimonial col-md-8 col-md-offset-2">
				<div className="testimonialText" dangerouslySetInnerHTML={{ __html: '"' + this.state.data.testimonial + '"' }}/>
				<br/>
				<p className="testimonialAuthor">
					{this.state.data.name}
					{(this.state.data.position === undefined || this.state.data.position === '') ? '' : ' (' + this.state.data.position + ')'}
					{(this.state.data.company === undefined || this.state.data.company === '') ? '' : ', ' + this.state.data.company}
				</p>
				<p className="testimonialDate">{moment(this.state.data.createdAt).fromNow()}</p>
			</div>
		);
	},
});

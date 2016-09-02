import React from 'react';
var update = require('react-addons-update');
import ReactDom from 'react-dom';
import { DataControl } from './dataControl';
import { Portfolio } from './portfolio';
import { Testimonial } from './testimonial';
import { Section } from './section';

const Portfolios = React.createClass({
	getInitialState: function () {
		return {
			portfolios: {
				ids: [],
				loaded: false,
				paused: false,
				current: '',
			},
			testimonials: {
				ids: [],
				loaded: false,
				paused: false,
				current: '',
			},
		};
	},
	componentWillMount: function () {
		this.updateIds();
	},
	componentDidMount: function () {
		this.refreshIntervalId = setInterval(function () {
			this.updateIds();
		}.bind(this), 30000);
	},
	componentWillUnmount: function () {
		this.portfolioIdUpdateRequest.abort();
		this.testimonialIdUpdateRequest.abort();
		clearInterval(this.refreshIntervalId);
	},
	updateIds: function () {
		this.portfolioIdUpdateRequest = $.get('/api/portfolios/ids', function (results) {
			var ids = [];
			results.forEach(function (item) {
				ids.push(item._id);
			});
			var newState;
			if (this.state.portfolios.current) {
				newState = update(this.state.portfolios, { $merge: {
					ids: ids,
					loaded: true,
				} });
				this.setState({ portfolios: newState });
			} else {
				newState = update(this.state.portfolios, { $merge: {
					ids: ids,
					loaded: true,
					current: ids[0],
				} });
				this.setState({ portfolios: newState });
			}
		}.bind(this));

		this.testimonialIdUpdateRequest = $.get('/api/testimonials/ids', function (results) {
			var ids = [];
			results.forEach(function (item) {
				ids.push(item._id);
			});
			var newState;
			if (this.state.testimonials.current) {
				newState = update(this.state.testimonials, { $merge: {
					ids: ids,
					loaded: true,
				} });
				this.setState({ testimonials: newState });
			} else {
				newState = update(this.state.testimonials, { $merge: {
					ids: ids,
					loaded: true,
					current: ids[0],
				} });
				this.setState({ testimonials: newState });
			}
		}.bind(this));
	},
	changePortfolioId: function (newId, pause) {
		var newState = update(this.state.portfolios, { $merge: {
			current: newId,
			paused: pause,
		} });
		this.setState({ portfolios: newState });
	},
	changeTestimonialId: function (newId, pause) {
		var newState = update(this.state.testimonials, { $merge: {
			current: newId,
			paused: pause,
		} });
		this.setState({ testimonials: newState });
	},
	render: function () {
		return (
			<div>
				<Section id="home" title="" />

				<Section id="portfolio" title="Our Portfolio">
					<DataControl
						slideInterval="5000"
						data={this.state.portfolios}
						changeId={this.changePortfolioId}
						dataType="portfolio"
					>
						<Portfolio />
					</DataControl>
				</Section>

				<Section id="testimonials" title="Testimonials">
					<DataControl
						slideInterval="5000"
						data={this.state.testimonials}
						changeId={this.changeTestimonialId}
						dataType="testimonial"
					>
						<Testimonial />
					</DataControl>
				</Section>

				<Section id="services" title="Services" />

				<Section id="team" title="Team" />

				<Section id="contact" title="Contact Us" />
			</div>
		);
	},
});

ReactDom.render(<Portfolios />, document.getElementById('app'));

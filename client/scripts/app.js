import React from 'react';
var update = require('react-addons-update');
import ReactDom from 'react-dom';
import { DataControl } from './dataControl';
import { Portfolio } from './portfolio';
import { Testimonial } from './testimonial';
import { Section } from './section';
import { Service } from './service';
import { Profile } from './profile';

const Portfolios = React.createClass({
	getInitialState: function () {
		var defaultState = {
			ids: [],
			loaded: false,
			paused: false,
			current: '',
		};
		return {
			portfolios: defaultState,
			testimonials: defaultState,
			services: defaultState,
			profiles: defaultState,
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
		this.serviceIdUpdateRequest.abort();
		this.profileIdUpdateRequest.abort();
		clearInterval(this.refreshIntervalId);
	},
	updateIds: function () {
		this.portfolioIdUpdateRequest = $.get('/api/portfolios/ids', function (results) {
			var ids = [];
			results.forEach(function (item) {
				ids.push(item._id);
			});
			var newState = update(this.state.portfolios, { $merge: {
				ids: ids,
				loaded: true,
				current: this.state.portfolios.current || ids[0],
			} });
			this.setState({ portfolios: newState });

		}.bind(this));

		this.testimonialIdUpdateRequest = $.get('/api/testimonials/ids', function (results) {
			var ids = [];
			results.forEach(function (item) {
				ids.push(item._id);
			});
			var newState = update(this.state.testimonials, { $merge: {
				ids: ids,
				loaded: true,
				current: this.state.testimonials.current || ids[0],
			} });
			this.setState({ testimonials: newState });
		}.bind(this));

		this.serviceIdUpdateRequest = $.get('/api/services/ids', function (results) {
			var ids = [];
			results.forEach(function (item) {
				ids.push(item._id);
			});
			var newState = update(this.state.services, { $merge: {
				ids: ids,
				loaded: true,
				current: this.state.services.current || ids[0],
			} });
			this.setState({ services: newState });
		}.bind(this));

		this.profileIdUpdateRequest = $.get('/api/profiles/ids', function (results) {
			var ids = [];
			results.forEach(function (item) {
				ids.push(item._id);
			});
			var newState = update(this.state.profiles, { $merge: {
				ids: ids,
				loaded: true,
				current: this.state.profiles.current || ids[0],
			} });
			this.setState({ profiles: newState });
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
	changeServiceId: function (newId, pause) {
		var newState = update(this.state.services, { $merge: {
			current: newId,
			paused: pause,
		} });
		this.setState({ services: newState });
	},
	changeProfileId: function (newId, pause) {
		var newState = update(this.state.profiles, { $merge: {
			current: newId,
			paused: pause,
		} });
		this.setState({ profiles: newState });
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

				<Section id="services" title="Services">
					<DataControl
						slideInterval="5000"
						data={this.state.services}
						changeId={this.changeServiceId}
						dataType="services"
					>
						<Service />
					</DataControl>
				</Section>

				<Section id="team" title="Team">
					<DataControl
						slideInterval="5000"
						data={this.state.profiles}
						changeId={this.changeProfileId}
						dataType="profiles"
					>
						<Profile />
					</DataControl>
				</Section>

				<Section id="contact" title="Contact Us" />
			</div>
		);
	},
});

ReactDom.render(<Portfolios />, document.getElementById('app'));

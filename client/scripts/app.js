import React from 'react';
import ReactDom from 'react-dom';
import { DataControl } from './dataControl';
import { Portfolio } from './portfolio';
import { Section } from './section';

const Portfolios = React.createClass({
	render: function () {
		return (
			<div>
				<Section id="home" title="" />

				<Section id="portfolio" title="Our Portfolio">
					<DataControl idQueryLink="/api/portfolios/ids">
						<Portfolio />
					</DataControl>
				</Section>

				<Section id="testimonials" title="Testimonials" />

				<Section id="services" title="Services" />

				<Section id="team" title="Team" />

				<Section id="contact" title="Contact Us" />
			</div>
		);
	},
});

ReactDom.render(<Portfolios />, document.getElementById('app'));

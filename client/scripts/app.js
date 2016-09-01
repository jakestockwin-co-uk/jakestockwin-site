import React from 'react';
import ReactDom from 'react-dom';
import { Section } from './section';
import { Portfolio } from './portfolio';

const Portfolios = React.createClass({
	render: function () {
		return (
			<Section idQueryLink="/api/portfolios/ids">
				<Portfolio />
			</Section>
		);
	},
});

ReactDom.render(<Portfolios />, document.getElementById('reactPortfolio'));

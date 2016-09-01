import React from 'react';
import ReactDom from 'react-dom';

const App = React.createClass({
	render: function () {
		return (
			<p>Hello World, this is a portfolio</p>
		);
	},
});

ReactDom.render(<App />, document.getElementById('reactPortfolio'));

import React from 'react';
import { Row } from 'elemental';

export const Section = React.createClass({
	render: function () {
		return (
			<div className="section" id={this.props.id}>
				<Row>
					<h1>{this.props.title}</h1>
				</Row>
				{this.props.children}
			</div>
		);
	},
});

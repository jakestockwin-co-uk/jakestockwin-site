import React from 'react';
import { Row } from 'elemental';

export const Section = React.createClass({
	render: function () {
		return (
			<div className="section" id={this.props.id}>
				<hr />
				<Row>
					<h1 className="heading sectionHeading">{this.props.title}</h1>
				</Row>
				<hr />
				{this.props.children}
			</div>
		);
	},
});

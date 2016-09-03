import React from 'react';
import { Col, Row, Spinner } from 'elemental';

export const TiledCardDataControl = React.createClass({
	shouldComponentUpdate: function (nextProps, nextState) {
		// Component should only update if list of ids has changed, or if current id has changed.
		// Equivalent to not updating if both ids and current is the same.
		return !arraysEqual(nextProps.data.ids, this.props.data.ids);
	},
	render: function () {
		if (!this.props.data.loaded) {
			return (
				<div className="center">
					<Spinner size="lg"/>
				</div>
			);
		}
		if (this.props.data.ids.length === 0) {
			return (
				<p>There are no items yet.</p>
			);
		}
		var childrenWithProps = [];
		var children = this.props.children;
		var width = this.props.cardWidth;
		this.props.data.ids.forEach(function (id) {
			childrenWithProps.push(
				React.Children.map(children, function (child) {
					var childWithProps = React.cloneElement(child, { id: id });
					return (
						<Col key={id} sm={width}>
							{childWithProps}
						</Col>
					);
				})
			);
		});
		return (
			<Row>
				{childrenWithProps}
			</Row>
		);
	},
});

function arraysEqual (a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

import React from 'react';
import { Button, Spinner, Glyph, Row, Col } from 'elemental';

export const DataControl = React.createClass({
	componentDidMount: function () {
		this.slideIntervalId = setInterval(function () {
			this.slide();
		}.bind(this), this.props.slideInterval);
	},
	shouldComponentUpdate: function (nextProps, nextState) {
		// Component should only update if list of ids has changed, or if current id has changed.
		// Equivalent to not updating if both ids and current is the same.
		return !(nextProps.data.current === this.props.data.current && arraysEqual(nextProps.data.ids, this.props.data.ids));
	},
	componentWillUnmount: function () {
		clearInterval(this.slideIntervalId);
	},
	changeId: function (newId, pause) {
		this.props.changeId(newId, pause);
	},
	slide: function () {
		if (this.props.data.paused !== true) {
			this.changeRight(false);
		}
	},
	changeLeft: function (pause) {
		var currentIndex = this.props.data.ids.indexOf(this.props.data.current);
		var newIndex;
		if (currentIndex === 0) {
			newIndex = this.props.data.ids.length - 1;
		} else {
			newIndex = currentIndex - 1;
		}
		var newId = this.props.data.ids[newIndex];
		// Unless pause is explicitly set to false, don't pause.
		// This stops the buttons from passing back the click event,
		// which occurs for the buttons in this, but not in Controls
		// TODO Work out a way to fix this properly...
		if (pause === false) {
			this.changeId(newId, false);
		} else {
			this.changeId(newId, true);
		}
	},
	changeRight: function (pause) {
		var currentIndex = this.props.data.ids.indexOf(this.props.data.current);
		var newIndex;
		if (currentIndex === this.props.data.ids.length - 1) {
			newIndex = 0;
		} else {
			newIndex = currentIndex + 1;
		}
		var newId = this.props.data.ids[newIndex];
		// Unless pause is explicitly set to false, don't pause.
		// This stops the buttons from passing back the click event,
		// which occurs for the buttons in this, but not in Controls
		// TODO Work out a way to fix this properly...
		if (pause === false) {
			this.changeId(newId, false);
		} else {
			this.changeId(newId, true);
		}
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
		var current = this.props.data.current;
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				id: current,
			})
		);
		return (
			<div className={'dataControl ' + this.props.dataType + 'DataControl'}>
				<Row>
					<Col xs="15%" className="center">
						<Button type="hollow-primary" onClick={this.changeLeft}>
							<Glyph icon="arrow-left"/>
						</Button>
					</Col>
					<Col xs="70%">
						{childrenWithProps}
					</Col>
					<Col xs="15%" className="center">
						<Button type="hollow-primary" onClick={this.changeRight}>
							<Glyph icon="arrow-right"/>
						</Button>
					</Col>
				</Row>
				<Row>
					<Controls
						ids={this.props.data.ids}
						current={this.props.data.current}
						changeId={this.changeId}
						changeLeft={this.changeLeft}
						changeRight={this.changeRight}
						dataType={this.props.dataType}
					/>
				</Row>
			</div>
		);
	},
});

const Controls = React.createClass({
	changeId: function (newId) {
		this.props.changeId(newId, true);
	},
	changeLeft: function () {
		this.props.changeLeft(true);
	},
	changeRight: function () {
		this.props.changeRight(true);
	},
	render: function () {
		var controlButtons = [];
		var current = this.props.current;
		var changeId = this.changeId;
		var dataType = this.props.dataType;
		if (this.props.ids) {
			controlButtons = this.props.ids.map(function (id) {
				return (
					<ControlButton key={id} id={id} current={current} handler={changeId} dataType={dataType}/>
				);
			});
		}
		return (
			<div className={'controls ' + this.props.dataType + 'Controls'}>
				<div className={'control ' + this.props.dataType + 'Control'} onClick={this.changeLeft}>
					<Glyph icon="triangle-left"/>
				</div>
				{controlButtons}
				<div className={'control ' + this.props.dataType + 'Control'} onClick={this.changeRight}>
					<Glyph icon="triangle-right"/>
				</div>
			</div>
		);
	},
});

const ControlButton = React.createClass({
	handleClick: function () {
		this.props.handler(this.props.id);
	},
	render: function () {
		if (this.props.id) {
			var active = this.props.current === this.props.id;
			return (
				<div className={'control ' + this.props.dataType + 'Control'} onClick={this.handleClick}>
					<Glyph icon="primitive-dot" type={active ? 'muted' : 'default'}/>
				</div>
			);
		}
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

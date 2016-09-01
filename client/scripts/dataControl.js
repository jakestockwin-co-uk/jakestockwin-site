import React from 'react';
import { Button, Spinner, Glyph, Row, Col } from 'elemental';

export const DataControl = React.createClass({
	getInitialState: function () {
		return {
			ids: [],
			loaded: false,
			paused: false,
		};
	},
	componentWillMount: function () {
		// TODO Remove this timeout before making site live.
		setInterval(function () {
			this.updateData();
		}.bind(this), 5000);
	},
	componentDidMount: function () {
		this.refreshIntervalId = setInterval(function () {
			this.updateData();
		}.bind(this), 30000);
		this.slideIntervalId = setInterval(function () {
			this.slide();
		}.bind(this), 5000);
	},
	componentWillUnmount: function () {
		this.updateRequest.abort();
		clearInterval(this.refreshIntervalId);
		clearInterval(this.slideIntervalId);
	},
	updateData: function () {
		this.updateRequest = $.get(this.props.idQueryLink, function (results) {
			var ids = [];
			results.forEach(function (item) {
				ids.push(item._id);
			});
			if (this.state.current) {
				this.setState({
					ids: ids,
					loaded: true,
				});
			} else {
				this.setState({
					ids: ids,
					loaded: true,
					current: ids[0],
				});
			}
		}.bind(this));
	},
	changePortfolioId: function (newId, pause) {
		this.setState({
			current: newId,
			paused: pause,
		});
	},
	slide: function () {
		if (this.state.paused !== true) {
			this.changePortfolioRight();
		}
	},
	changePortfolioLeft: function (pause) {
		var currentIndex = this.state.ids.indexOf(this.state.current);
		var newIndex;
		if (currentIndex === 0) {
			newIndex = this.state.ids.length - 1;
		} else {
			newIndex = currentIndex - 1;
		}
		this.setState({
			current: this.state.ids[newIndex],
			paused: pause,
		});
	},
	changePortfolioRight: function (pause) {
		var currentIndex = this.state.ids.indexOf(this.state.current);
		var newIndex;
		if (currentIndex === this.state.ids.length - 1) {
			newIndex = 0;
		} else {
			newIndex = currentIndex + 1;
		}
		this.setState({
			current: this.state.ids[newIndex],
			paused: pause,
		});
	},
	render: function () {
		if (!this.state.loaded) {
			return (
				<div className="center">
					<Spinner size="lg"/>
				</div>
			);
		}
		if (this.state.ids.length === 0) {
			return (
				<p>There are no items yet.</p>
			);
		}
		var current = this.state.current;
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				id: current,
			})
		);

		return (
			<div className="dataControl">
				<Row>
					<Col xs="15%" className="center">
						<Button type="hollow-primary" onClick={this.changePortfolioLeft}>
							<Glyph icon="arrow-left"/>
						</Button>
					</Col>
					<Col xs="70%">
						{childrenWithProps}
					</Col>
					<Col xs="15%" className="center">
						<Button type="hollow-primary" onClick={this.changePortfolioRight}>
							<Glyph icon="arrow-right"/>
						</Button>
					</Col>
				</Row>
				<Row>
					<Controls
						ids={this.state.ids}
						current={this.state.current}
						changePortfolio={this.changePortfolioId}
						changePortfolioLeft={this.changePortfolioLeft}
						changePortfolioRight={this.changePortfolioRight}
					/>
				</Row>
			</div>
		);
	},
});

const Controls = React.createClass({
	changePortfolioId: function (newId) {
		this.props.changePortfolio(newId, true);
	},
	changePortfolioLeft: function () {
		this.props.changePortfolioLeft(true);
	},
	changePortfolioRight: function () {
		this.props.changePortfolioRight(true);
	},
	render: function () {
		var controlButtons = [];
		var current = this.props.current;
		var changePortfolioId = this.changePortfolioId;
		if (this.props.ids) {
			controlButtons = this.props.ids.map(function (id) {
				return (
					<ControlButton key={id} id={id} current={current} handler={changePortfolioId}/>
				);
			});
		}
		return (
			<div className="controls" classID="portfolioControls">
				<div className="control" onClick={this.changePortfolioLeft}>
					<Glyph icon="triangle-left"/>
				</div>
				{controlButtons}
				<div className="control" onClick={this.changePortfolioRight}>
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
				<div className="control" onClick={this.handleClick}>
					<Glyph icon="primitive-dot" type={active ? 'muted' : 'default'}/>
				</div>
			);
		}
	},
});


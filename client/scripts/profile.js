import React from 'react';
import { Button, Card, Pill, Glyph } from 'elemental';

export const Profile = React.createClass({
	getInitialState: function () {
		return ({
			data: {
				name: 'loading...',
				position: '',
				github: '',
				linkedin: '',
				tags: [],
				image: '',
				description: 'Please wait while we load the information...',
			},
		});
	},
	componentWillMount: function () {
		this.update(this.props.id);

	},
	componentWillReceiveProps (nextProps) {
		if (nextProps.id !== this.props.id) {
			this.update(nextProps.id);
		}
	},
	shouldComponentUpdate: function (nextProps, nextState) {
		// Component should only update if the id has changed (in which case it needs to load a new profile)
		// or if the state has changed, since it needs to re-load once the data has updated.
		return nextProps.id !== this.props.id || nextState.data.name !== this.state.data.name;
	},
	componentWillUnmount: function () {
		this.profileRequest.abort();
	},
	update: function (id) {
		this.profileRequest = $.get('/api/profiles/' + id, function (result) {
			this.setState({ data: result });
		}.bind(this));
	},
	render: function () {
		var tagPills = this.state.data.tags.map(function (tag) {
			return (<Pill type="primary" label={tag} key={tag} />);
		});
		var github = '';
		if (this.state.data.github) {
			github = (<div className="githubLink link">
				<a href={this.state.data.github} target="_blank">
					<Button type="primary" className="linkButton">
						<Glyph icon="octoface"/>
					</Button>
				</a>
			</div>);
		}
		var linkedin = '';
		if (this.state.data.linkedIn) {
			linkedin = (<div className="linkedInLink link">
				<a href={this.state.data.linkedIn} target="_blank">
					<Button type="primary" className="linkButton">
						in
					</Button>
				</a>
			</div>);
		}
		var profilePic = '';
		if (this.state.data.image) {
			profilePic = (<img src={this.state.data.image.secure_url} className="profilePic img-responsive pull-right"/>);
		}
		return (
			<div className="profile cardContainer">
				<Card>
					{profilePic}
					<h3>{this.state.data.name}</h3>
					<p>{this.state.data.position}</p>
					{tagPills}
					<div dangerouslySetInnerHTML={{ __html: this.state.data.description }}/>
					<div className="linkWrapper">
						{github}
						{linkedin}
					</div>
				</Card>
			</div>
		);
	},
});

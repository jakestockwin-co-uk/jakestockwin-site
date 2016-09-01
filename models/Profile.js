var keystone = require('keystone');
var Types = keystone.Field.Types;

var Profile = keystone.List('Profile');

Profile.add({
	name: { type: String, required: true, index: true, initial: true },
	image: { type: Types.CloudinaryImage },
	position: { type: String },
	description: { type: Types.Html, wysiwyg: true },
	github: { type: Types.Url },
	linkedIn: { type: Types.Url },
	tags: { type: Types.TextArray },
});

Profile.defaultColumns = 'name';
Profile.register();

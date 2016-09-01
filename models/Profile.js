var keystone = require('keystone');
var Types = keystone.Field.Types;

var Profile = keystone.List('Profile');

Profile.add({
	name: { type: String, required: true, index: true, initial: true },
	image: { type: Types.cloudinaryImage },
	position: { type: String },
	description: { type: Types.html, wysiwyg: true },
	github: { type: Types.url },
	linkedIn: { type: Types.url },
	tags: { type: Types.textarray },
});

Profile.defaultColumns = 'name';
Profile.register();

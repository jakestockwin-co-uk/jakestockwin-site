var keystone = require('keystone');
var Types = keystone.Field.Types;

var Portfolio = keystone.List('Portfolio');

Portfolio.add({
	name: { type: String, required: true, index: true, initial: true },
	client: { type: String, required: true, initial: true },
	url: { type: Types.Url, required: true, initial: true },
	description: { type: Types.Html, required: true, wysiwyg: true, initial: true },
});

Portfolio.defaultColumns = 'name, client, url';
Portfolio.register();

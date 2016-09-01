var keystone = require('keystone');
var Types = keystone.Field.Types;

var Service = keystone.List('Service');

Service.add({
	name: { type: String, required: true, initial: true, index: true },
	description: { type: Types.Html, wysiwyg: true, required: true, initial: true },
});

Service.defaultColumns = 'name';
Service.register();

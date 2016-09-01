var keystone = require('keystone');
var Types = keystone.Field.Types;

var Testimonial = keystone.List('Testimonial');

Testimonial.add({
	name: { type: String, required: true, initial: true, index: true },
	company: { type: String, required: true, initial: true },
	testimonial: { type: Types.textarea, required: true, initial: true },
	createdAt: { type: Date, default: Date.now },
});

Testimonial.defaultColumns = 'name, company';
Testimonial.defaultSort = '-createdAt';
Testimonial.register();

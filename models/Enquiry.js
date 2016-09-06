var keystone = require('keystone');
var Types = keystone.Field.Types;
var nodemailer = require('nodemailer');

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: Types.Text },
	enquiryType: { type: Types.Select, required: true, options: [
		{ value: 'website', label: 'I\'m interested in your web design services' },
		{ value: 'hosting', label: 'I\'m interested in your hosting services' },
		{ value: 'message', label: 'Just leaving a message' },
		{ value: 'question', label: 'I\'ve got a question' },
		{ value: 'other', label: 'Something else...' },
	] },
	message: { type: Types.Textarea, required: true, height: 500 },
	createdAt: { type: Date, default: Date.now },
});


// Keystone doesn't display the fields quite so nicely if noedit it set.
// Instead of this, we're going to have a pre save hook that prevents updates.

Enquiry.schema.pre('save', function (next) {
	if (!this.isNew) {
		next(new Error('You cannot make changes to enquiries'));
	} else {
		next();
	}
});


Enquiry.schema.post('save', function (enquiry) {
	var config = {
		host: 'smtp.zoho.com',
		port: 465,
		secure: true,
		authMethod: 'LOGIN',
		auth: {
			user: 'noreply@jakestockwin.co.uk',
			pass: process.env.ZOHO_PASSWORD,
		},
	};

	var transporter = nodemailer.createTransport(config);

	if (process.env.TRAVIS) {
		console.log('Not sending email during testing');
		return true;
	}
	var message = 'You have recieved a new enqiry from ' + enquiry.name.full + '.<br>'
		+ ' To see the details, <a href="https://www.jakestockwin.co.uk/keystone/enquiries/' + enquiry._id + '">click here.';
	var mailOptions = {
		from: '"jakestockwin.co.uk" <noreply@jakestockwin.co.uk>', // sender address
		to: 'jake@jakestockwin.co.uk', // list of receivers
		subject: 'New website enquiry', // Subject line
		html: message, // plaintext body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		console.log('New enquiry recieved. Sending emails');
		if (err) {
			console.log('Error sending email:');
			console.log(err);
		} else {
			console.log('Message sent: ' + info.response);
		}
	});

});

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();

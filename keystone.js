// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

keystone.init({

	'name': 'jakestockwin.co.uk',
	'brand': 'jakestockwin.co.uk',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

	'model prefix': 'jakestockwin',

});

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	content: ['portfolios', 'testimonials', 'services', 'profiles'],
	enquiries: 'enquiries',
	users: 'users',
});

if (keystone.get('env') === 'production') {
	keystone.set('session store', 'connect-mongo');
}

keystone.start();

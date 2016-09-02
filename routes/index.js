var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var babelify = require('babelify');
var browserify = require('browserify-middleware');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

var clientConfig = {
	commonPackages: [
		'react',
		'react-dom',
	],
};

// Setup Route Bindings
exports = module.exports = function (app) {

	// Bundle common packages
	app.get('/js/packages.js', browserify(clientConfig.commonPackages, {
		cache: true,
		precompile: true,
	}));

	// Serve script bundles
	app.use('/js', browserify('./client/scripts', {
		external: clientConfig.commonPackages,
		transform: [babelify.configure({
			presets: [require('babel-preset-es2015'), require('babel-preset-react')],
		})],
	}));

	// Views
	app.all('/', routes.views.index);


	app.get('/api/portfolios/ids', keystone.middleware.api, routes.api.portfolio.ids);
	app.get('/api/portfolios/:id', keystone.middleware.api, routes.api.portfolio.get);
	app.get('/api/testimonials/ids', keystone.middleware.api, routes.api.testimonial.ids);
	app.get('/api/testimonials/:id', keystone.middleware.api, routes.api.testimonial.get);
	app.get('/api/services/ids', keystone.middleware.api, routes.api.service.ids);
	app.get('/api/services/:id', keystone.middleware.api, routes.api.service.get);
	app.get('/api/profiles/ids', keystone.middleware.api, routes.api.profile.ids);
	app.get('/api/profiles/:id', keystone.middleware.api, routes.api.profile.get);
};

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
};

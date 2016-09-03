var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {

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

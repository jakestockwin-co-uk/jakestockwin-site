var	keystone = require('keystone');

var Testimonial = keystone.list('Testimonial');

/**
 * List Testimonial ids
 */
exports.ids = function (req, res) {
	Testimonial.model.find({}).select('_id').exec(function (err, items) {

		if (err) return res.apiError('database error', err);

		res.apiResponse(items);

	});
};

/**
 * Get Testimonial by ID
 */
exports.get = function (req, res) {
	Testimonial.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		res.apiResponse(item);

	});
};

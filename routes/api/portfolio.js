var	keystone = require('keystone');

var Portfolio = keystone.list('Portfolio');

/**
 * List Portfolio ids
 */
exports.ids = function (req, res) {
	Portfolio.model.find({}).select('_id').exec(function (err, items) {

		if (err) return res.apiError('database error', err);

		res.apiResponse(items);

	});
};

/**
 * Get Portfolio by ID
 */
exports.get = function (req, res) {
	Portfolio.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		res.apiResponse(item);

	});
};

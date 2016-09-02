var	keystone = require('keystone');

var Service = keystone.list('Service');

/**
 * List Service ids
 */
exports.ids = function (req, res) {
	Service.model.find({}).select('_id').exec(function (err, items) {

		if (err) return res.apiError('database error', err);

		res.apiResponse(items);

	});
};

/**
 * Get Service by ID
 */
exports.get = function (req, res) {
	Service.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		res.apiResponse(item);

	});
};

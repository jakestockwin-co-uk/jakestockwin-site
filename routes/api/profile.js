var	keystone = require('keystone');

var Profile = keystone.list('Profile');

/**
 * List Profile ids
 */
exports.ids = function (req, res) {
	Profile.model.find({}).select('_id').exec(function (err, items) {

		if (err) return res.apiError('database error', err);

		res.apiResponse(items);

	});
};

/**
 * Get Profile by ID
 */
exports.get = function (req, res) {
	Profile.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		res.apiResponse(item);

	});
};

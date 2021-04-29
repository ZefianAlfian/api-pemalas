const ErrorResponse = require("../utils/responseError");

/**
 * search Middleware
 * @param {Object} req req dari express js
 * @param {Object} res res dari express js
 * @param {Function} next function dari express js
 * @returns object
 */
/**
 * searchMiddleware
 * @param {Object} options detail true or false
 * @returns 
 */
module.exports = function (options = {}) {
	return function (req, res, next) {
		if (!options.detail || options.detail != true) {
			options.detail = false;
		}
		let q = req.query.query || req.query.q || req.query.search || req.query.url;
		if (!q) {
			if (options.detail == true) {
				next(new ErrorResponse("Input the query you want to check in more detail", 401));
				return false;
			} else {
				next(new ErrorResponse("Input query url", 401));
				return false;
			}
		}
		res.locals.query = q;
		next();
	};
};

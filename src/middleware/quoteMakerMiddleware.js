const ErrorResponse = require("../utils/responseError");
const { isValidURL } = require("../utils/values");

/**
 * quoteMaker Middleware
 * @param {Object} req req dari express js
 * @param {Object} res res dari express js
 * @param {Function} next function dari express js
 * @returns response
 */
module.exports = function (req, res, next) {
	let author = req.query.author || req.query.aut || req.query.pembuat;
	let quote = req.query.quote || req.query.text || req.query.query;
	let bg = req.query.image || req.query.bg || req.query.background || req.query.img;
	if (!author) {
		next(new ErrorResponse("Input author", 401));
		return false;
	}
	if (!quote) {
		next(new ErrorResponse("Input quote", 401));
		return false;
	}
	if (bg) {
		if (isValidURL(bg) != true) {
			next(new ErrorResponse("Url not valid", 401));
			return false;
		}
		res.locals.bg = bg;
	}
	res.locals.author = author;
	res.locals.quote = quote;
	next();
};

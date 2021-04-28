const { updateLimit, findApikey } = require("../model/ApikeyModel");
const cekApikey = require("../utils/cekApikey");
const ErrorResponse = require("../utils/responseError");

/**
 * Cek Apikey dan mengurangi limit
 * @param {Object} req req dari express js
 * @param {Object} res res dari express js
 * @param {Object} next function dari express js
 */
module.exports = async function (req, res, next) {
	let apikey = req.query.apikey;
	if (!apikey) {
		next(new ErrorResponse("Input apikey", 401));
		return false;
	}
	let cek = await cekApikey(apikey, res, next);
	if (!cek) {
		next(new ErrorResponse("invalid apikey", 406));
		return false;
	}
  let liatLimit = await findApikey(apikey)
	let kurangiLimit = liatLimit.limit - 1;
	await updateLimit(apikey, kurangiLimit);
	next();
};

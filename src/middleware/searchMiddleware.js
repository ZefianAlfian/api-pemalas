const ErrorResponse = require("../utils/responseError");

/**
 * search Middleware
 * @param {Object} req req dari express js
 * @param {Object} res res dari express js
 * @param {Function} next function dari express js
 * @returns object
 */
module.exports = function (req, res, next) {
  let q = req.query.query || req.query.q || req.query.search;
  if (!q) {
    next(new ErrorResponse("Input query", 401));
    return false;
  }
  res.locals.query = q
  next();
};

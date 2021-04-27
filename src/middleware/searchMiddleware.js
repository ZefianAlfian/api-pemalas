const ErrorResponse = require("../utils/responseError");

module.exports = function (req, res, next) {
  let q = req.query.query;
  if (!q) {
    next(new ErrorResponse("Input query", 401));
    return false;
  }
  res.locals.query = q
  next();
};

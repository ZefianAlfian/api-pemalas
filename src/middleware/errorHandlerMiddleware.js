/**
 * 
 * @param {Object} err error dari express js
 * @param {Object} req req dari express js
 * @param {Object} res res dari express js
 * @param {Function} next function dari express js
 */
module.exports = function (err, req, res, next) {
    let error = { ...err };
    error.message = err.message;
  
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  };
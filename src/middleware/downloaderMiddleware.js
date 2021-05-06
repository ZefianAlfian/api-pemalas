const ErrorResponse = require("../utils/responseError");

module.exports = function (options = {}) {
    return async function(req, res, next){
        let q = req.query.q || req.query.url || req.query.query || req.query.link;
        if (!q){
            next(new ErrorResponse("Input query", 401));
            return false;
        }
        res.locals.q = q;
        next();
    }
}
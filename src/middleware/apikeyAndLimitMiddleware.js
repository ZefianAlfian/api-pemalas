const cekApikey = require("../utils/cekApikey");
const ErrorResponse = require("../utils/responseError");

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
  
  next();
};

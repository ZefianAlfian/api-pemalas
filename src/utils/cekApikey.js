const { findApikey } = require("../model/ApikeyModel");
const ErrorResponse = require("./responseError");

module.exports = async function (apikey, res, next) {
  let cek = await findApikey(apikey);
  if (cek == null) {
    return false;
  } else {
    return true;
  }
};

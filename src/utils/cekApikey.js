const { findApikey } = require("../model/ApikeyModel");
const ErrorResponse = require("./responseError");

/**
 * CekApiKey : boolean
 * @param {String} apikey apikey user
 * @returns boolean
 */
module.exports = async function (apikey) {
  let cek = await findApikey(apikey);
  if (cek == null) {
    return false;
  } else {
    return true;
  }
};

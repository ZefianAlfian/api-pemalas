const bcrypt = require("bcryptjs");
const { cekUserLogin } = require("../model/UsersModel");
const { responseMessage } = require("../utils/responseHandler");
const ErrorResponse = require("../utils/responseError");

/**
 * validasi Login / Sign In
 * @param {Object} data data information
 * @param {Object} req req dari express js
 * @returns object
 */
module.exports = async function (data, req) {
  let cek = await cekUserLogin(data);
  if (cek == null) {
    return { status: 401, message: "User does not exist" };
  }
  let cekPwBc = await bcrypt.compare(data.password.toLowerCase(), cek.password);
  if (cekPwBc == true) {
    req.session.isLogged = true;
    req.session.dataUser = cek;
    return { status: 200, message: "Succses login" };
  }
};

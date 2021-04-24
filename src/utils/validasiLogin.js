const bcrypt = require("bcryptjs");
const { cekUserLogin } = require("../model/UsersModel");
const { responseMessage } = require("../utils/responseHandler");
const ErrorResponse = require("../utils/responseError");

module.exports = async function (data, req, res, next) {
  let cek = await cekUserLogin(data);
  if (cek == null) {
    next(new ErrorResponse("User does not exist", 401));
    return false;
  }
  if (cek == true) {
    let cekPwBc = await bcrypt.compare(
      data.password.toLowerCase(),
      cek.password
    );
    if (cekPwBc != true) {
      next(new ErrorResponse("Wrong password", 401));
      return false;
    }
  }
  if (data.password != data.repeatPassword) {
    next(new ErrorResponse("Passwords are not the same", 401));
    return false;
  }
  let cekPw = data.password.split("").length;
  if (cekPw < 8) {
    next(new ErrorResponse("Password min 8 character", 401));
  }
  if (cekPwBc) {
    responseMessage(res, 200, "Succses login");
    req.session.isLogged = true;
    req.session.dataUser = cek;
    req.session.save();
  }
};

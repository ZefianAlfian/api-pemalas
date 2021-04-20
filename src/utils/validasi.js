const base64 = require("base-64");
const validator = require("validator");
const ErrorResponse = require("./responseError");

module.exports.validasi = async function (body, next) {
  let { email, username, nomor_whatsapp, password, repeatPassword } = body;
  email = email.toLowerCase();
  username = username.toLowerCase();
  password = password.toLowerCase();
  repeatPassword = repeatPassword.toLowerCase();
  if (password !== repeatPassword) {
    next(new ErrorResponse("Passwords are not the same", 400));
    return false;
  }
  password = base64.encode(password);

  if (validator.isEmpty(email) != false) {
    next(new ErrorResponse("input email!"), 400);
    return false;
  }
  if (validator.isInt(nomor_whatsapp, { min: 13, max: 14 }) != false) {
    next(new ErrorResponse("check your whatsapp number"), 400);
    return false;
  }
  if (validator.isMobilePhone(nomor_whatsapp) != true) {
    next(new ErrorResponse("whatsapp number not correct"), 400);
    return false;
  }

  let data = {
    email,
    username,
    nomor_whatsapp,
    password,
  };
  
  return data;
};

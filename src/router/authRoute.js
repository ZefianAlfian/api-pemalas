const { Router } = require("express");
const expressLimit = require("express-rate-limit");
const base64 = require("base-64");
const validator = require("validator");
// const expressMulter = require("multer");
// const upload = expressMulter();
const router = Router();

const ErrorResponse = require("../utils/responseError");
const { responseData, responseMessage } = require("../utils/responseHandler");
const { berapaView, tambahView } = require("../model/ViewModel");

const createAccountLimiter = expressLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 2, // start blocking after 5 requests
  handler: function (req, res, next) {
    next(new ErrorResponse(`Too many request form this IP`, 429));
  },
});

router.post("/register", async (req, res, next) => {
  let { email, username, nomor_whatsapp, password, repeatPassword } = req.body;
  email = email.toLowerCase();
  username = username.toLowerCase();
  password = password.toLowerCase();
  repeatPassword = repeatPassword.toLowerCase();
  if (password !== repeatPassword) {
    next(new ErrorResponse("Passwords are not the same", 403));
    return false;
  }
  pasword = base64.encode(password);
  
  if (validator.isEmpty(email) != false) {
    next(new ErrorResponse("input email!"));
    return false;
  }
  if (validator.isInt(nomor_whatsapp, { min: 13, max: 14 }) != false) {
    next(new ErrorResponse("check your whatsapp number"));
    return false;
  }
  if (validator.isMobilePhone(nomor_whatsapp) != true) {
    next(new ErrorResponse("whatsapp number not correct"));
    return false;
  }
  responseMessage(res, 200, "Successfully registered. Please check your whatsapp to verified account!");
});

router.get("/register", async (req, res, next) => {
  if (req.session.isLogged && req.session.isLogged == true) {
    res.redirect("../");
    return false;
  }
  await tambahView();
  let view = await berapaView();
  view = view.counter;

  let today = new Date();
  let year = today.getFullYear();
  res.render("register", {
    title: "Register | Pemalas",
    pageAuth: "register",
    csrfToken: req.csrfToken(),
    year: year,
    view: view,
  });
});

router.get("/login", async (req, res, next) => {
  if (req.session.isLogged && req.session.isLogged == true) {
    res.redirect("../");
    return false;
  }
  await tambahView();
  let view = await berapaView();
  view = view.counter;

  let today = new Date();
  let year = today.getFullYear();
  res.render("login", {
    title: "Login | Pemalas",
    pageAuth: "login",
    csrfToken: req.csrfToken(),
    year: year,
    view: view,
  });
});

module.exports = router;

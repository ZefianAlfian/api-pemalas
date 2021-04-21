require("dotenv").config();

const { Router } = require("express");
const expressLimit = require("express-rate-limit");
// const expressMulter = require("multer");
// const upload = expressMulter();
const router = Router();

const PemalasDB = require("../config/db");
const ErrorResponse = require("../utils/responseError");
const { responseData, responseMessage } = require("../utils/responseHandler");
const { berapaView, tambahView } = require("../model/ViewModel");
const { validasi } = require("../utils/validasi");
const { tambahUser, cekUser } = require("../model/UsersModel");
const { subject_email } = require("../config/values");

const createAccountLimiter = expressLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 2, // start blocking after 5 requests
  handler: function (req, res, next) {
    next(new ErrorResponse(`Too many request form this IP`, 429));
  },
});

router.post("/register", async (req, res, next) => {
  let data = await validasi(req.body, subject_email,next);
  await tambahUser(data);
  
  req.session.isLogged = false;
  req.session.dataUser = data;
  responseMessage(
    res,
    200,
    "Successfully registered. Please check your email to verified account!"
  );
});

router.get("/register", async (req, res, next) => {
  if (req.session.isLogged && req.session.isLogged == true) {
    res.redirect("../");
    return false;
  }
  await tambahView();
  let view = await berapaView();
  view = view.list.length;

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

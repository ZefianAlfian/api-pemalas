const fetch = require("node-fetch");
const cheerio = require("cheerio");
const FormData = require("form-data");
const path = require("path");

const express = require("express");
const expressLimit = require("express-rate-limit");
const expressSession = require("express-session");
const expressCsrf = require("csurf");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const ErrorResponse = require("./utils/responseError");
const { responseData, responseMessage } = require("./utils/responseHandler");

const PORT = process.env.PORT || 3000;
const app = express();
const monk = require("monk");
const url =
  "mongodb+srv://pemalasapi:pemalasapi7387@cluster0.mn1td.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const email = "tryaha78@gmail.com";

const db = monk(url);

db.then(() => {
  console.log("Connected correctly to server");
});

const pemalasDB = db.get("pemalasapi");

async function berapaView() {
  let v = await pemalasDB.findOne({ _id: "607bdc01616fe325c421225c" });
  return v;
}
async function tambahView() {
  let v = await berapaView();
  v = v.counter;
  v = v + 1;
  pemalasDB.findOneAndUpdate(
    { _id: "607bdc01616fe325c421225c" },
    { $set: { counter: v } },
    (err, res) => {
      if (err) return err;
      console.log(res);
    }
  );
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("json spaces", 2);

app.use(logger("dev"));
app.use(
  expressSession({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(expressCsrf({ cookie: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const createAccountLimiter = expressLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 2, // start blocking after 5 requests
  handler: function (req, res, next) {
    next(new ErrorResponse(`Too many request form this IP`, 429));
  },
});
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server error",
  });
};

app.get("/", async (req, res, next) => {
  if (!req.session.isLogged && req.session.isLogged !== true){
    res.redirect("/auth/login");
    return false;
  }
  await tambahView();
  let view = await berapaView();
  view = view.counter;

  let today = new Date();
  let year = today.getFullYear();
  res.render("dashboard", {
    csrfToken: req.csrfToken(),
    year: year,
    view: view,
  });
});

app.get("/auth/login", async (req, res, next) => {
  if (req.session.isLogged && req.session.isLogged == true){
    res.redirect("../");
    return false;
  }
  await tambahView();
  let view = await berapaView();
  view = view.counter;

  let today = new Date();
  let year = today.getFullYear();
  res.render("login", {
    csrfToken: req.csrfToken(),
    year: year,
    view: view,
  });
});

app.use(errorHandler);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  // res.render("error", { email });
  res.send("error");
});

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});

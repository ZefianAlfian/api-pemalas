const express = require("express");
const expressSession = require("express-session");
const expressCsrf = require("csurf");
const viewsEngine = require("ejs-locals");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const path = require("path");
const createError = require("http-errors");

const { berapaView, tambahView } = require("./model/ViewModel");
const { totalUser } = require("./model/UsersModel");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

const PORT = process.env.PORT || 3000;
const app = express();

app.engine("ejs", viewsEngine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("json spaces", 2);

app.use(logger("dev"));
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", expressCsrf({ cookie: true }), async (req, res, next) => {
  await tambahView();
  let view = await berapaView();
  view = view.list.length;

  let today = new Date();
  let year = today.getFullYear();

  let userAll = await totalUser();
  res.render("dash", {
    title: "Home | Pemalas",
    csrfToken: req.csrfToken(),
    year: year,
    view: view,
    userRegis: userAll,
    req,
  });
});

app.use("/documentation", require("./router/docsRoute"));
app.use("/auth", require("./router/authRoute"));
app.use("/api", require("./router/apiRoute"));
app.use(errorHandlerMiddleware);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  // res.render("error", { email });
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});

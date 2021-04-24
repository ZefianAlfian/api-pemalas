const { Router } = require("express");
const { totalUser } = require("../model/UsersModel");
const { tambahView, berapaView } = require("../model/ViewModel");
const expressCsrf = require("csurf");
const router = Router();

router.get("/", expressCsrf({ cookie: true }), async (req, res, next) => {
  if (!req.session.isLogged && req.session.isLogged !== true) {
    res.redirect("/auth/login");
    return false;
  }
  await tambahView();
  let view = await berapaView();
  view = view.list.length;

  let today = new Date();
  let year = today.getFullYear();

  let userAll = await totalUser();
  res.render("docs", {
    title: "Documentation | Pemalas",
    csrfToken: req.csrfToken(),
    year: year,
    view: view,
    userRegis: userAll,
    req,
  });
});

module.exports = router;

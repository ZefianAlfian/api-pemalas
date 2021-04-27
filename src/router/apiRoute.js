const { Router } = require("express");
const router = Router();

const path = require("path");
const fs = require("fs");

const { responseData, responseMessage } = require("../utils/responseHandler");
const ErrorResponse = require("../utils/responseError");
const apikeyAndLimitMiddleware = require("../middleware/apikeyAndLimitMiddleware");
const playstoreSearch = require("../../lib/search/playstoreSearch");
const searchMiddleware = require("../middleware/searchMiddleware");

router.get(
  "/playstore-search",
  apikeyAndLimitMiddleware,
  searchMiddleware,
  (req, res, next) => {
    playstoreSearch(res.locals.query)
      .then((data) => {
        responseData(res, 200, data);
      })
      .catch((er) => {
        console.log(er);
        next(new ErrorResponse("Internal server error", 500));
      });
  }
);

module.exports = router;

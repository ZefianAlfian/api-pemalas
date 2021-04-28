const { Router } = require("express");
const router = Router();

const path = require("path");
const fs = require("fs");

const { responseData, responseMessage } = require("../utils/responseHandler");
const { createQuote } = require("../../lib/maker/quoteMaker");
const { internalError } = require("../utils/values");
const ErrorResponse = require("../utils/responseError");
const apikeyAndLimitMiddleware = require("../middleware/apikeyAndLimitMiddleware");
const playstoreSearch = require("../../lib/search/playstoreSearch");
const searchMiddleware = require("../middleware/searchMiddleware");
const quoteMakerMiddleware = require("../middleware/quoteMakerMiddleware");
const random = Math.random().toString(36).substring(7);

router.get("/playstore-search", apikeyAndLimitMiddleware, searchMiddleware, (req, res, next) => {
	playstoreSearch(res.locals.query)
		.then((data) => {
			responseData(res, 200, data);
		})
		.catch((er) => {
			console.log(er);
			next(new ErrorResponse(internalError, 500));
		});
});

router.get("/quote-maker", apikeyAndLimitMiddleware, quoteMakerMiddleware, (req, res, next) => {
	createQuote(res.locals.author, res.locals.quote)
		.then((data) => {
			fs.writeFileSync(path.join(__dirname, `../public/storage/${random}.jpeg`), data);
			responseData(res, 200, `https://api-pemalas.herokuapp.com/storage/${random}.jpeg`);
		})
		.catch((er) => {
			console.log(er);
			next(new ErrorResponse(internalError, 500));
		});
});

module.exports = router;

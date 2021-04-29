const { Router } = require("express");
const router = Router();

const path = require("path");
const fs = require("fs");

const { responseData, responseMessage } = require("../utils/responseHandler");
const { createQuote } = require("../../lib/maker/quoteMaker");
const { internalError } = require("../utils/values");
const ErrorResponse = require("../utils/responseError");

//lib local
const playstoreSearch = require("../../lib/search/playstoreSearch");
const gsmarenaSearch = require("../../lib/search/gsmarenaSearch");

//Middleware
const searchMiddleware = require("../middleware/searchMiddleware");
const quoteMakerMiddleware = require("../middleware/quoteMakerMiddleware");
const apikeyAndLimitMiddleware = require("../middleware/apikeyAndLimitMiddleware");
const gsmarenaDetail = require("../../lib/detail/gsmarenaDetail");

const pathStorage = path.join(__dirname, `../public/storage`);

//Searching
router.get("/playstore-search", apikeyAndLimitMiddleware, searchMiddleware(), (req, res, next) => {
	playstoreSearch(res.locals.query)
		.then((data) => {
			if (!data[0].title) {
				next(new ErrorResponse(internalError, 500));
				return false;
			}
			responseData(res, 200, data);
		})
		.catch((er) => {
			console.log(er);
			next(new ErrorResponse(internalError, 500));
		});
});

router.get("/gsmarena-search", apikeyAndLimitMiddleware, searchMiddleware(), (req, res, next) => {
	gsmarenaSearch(res.locals.query)
		.then((data) => {
			if (data == false) {
				next(new ErrorResponse("Not found", 401));
			}
			responseData(res, 200, data);
		})
		.catch((er) => {
			console.log(er);
			next(new ErrorResponse(internalError, 500));
		});
});

//Detail
router.get(
	"/gsmarena-detail",
	apikeyAndLimitMiddleware,
	searchMiddleware({ detail: true }),
	(req, res, next) => {
		gsmarenaDetail(res.locals.query)
			.then((data) => {
				if (data == false) {
					next(new ErrorResponse("Url not valid", 401));
					return false;
				}
				responseData(res, 200, data);
			})
			.catch((er) => {
				console.log(er);
				next(new ErrorResponse(internalError, 500));
			});
	}
);

//Maker
router.get("/quote-maker", apikeyAndLimitMiddleware, quoteMakerMiddleware, (req, res, next) => {
	const random = Math.random().toString(36).substring(7);
	createQuote(res.locals.author, res.locals.quote)
		.then((data) => {
			fs.writeFileSync(pathStorage + `/${random}.jpeg`, data);
			responseData(res, 200, `https://api-pemalas.herokuapp.com/storage/${random}.jpeg`);
		})
		.catch((er) => {
			console.log(er);
			next(new ErrorResponse(internalError, 500));
		});
});

module.exports = router;

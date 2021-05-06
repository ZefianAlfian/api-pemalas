require("dotenv").config();

const { Router } = require("express");
const expressLimit = require("express-rate-limit");
const expressCsrf = require("csurf");
// const expressMulter = require("multer");
// const upload = expressMulter();
const router = Router();

const PemalasDB = require("../config/db");
const ErrorResponse = require("../utils/responseError");
const jwt = require("jsonwebtoken");
const { responseData, responseMessage } = require("../utils/responseHandler");
const { berapaView, tambahView } = require("../model/ViewModel");
const validasi = require("../utils/validasiRegister");
const { tambahUser, cekUser } = require("../model/UsersModel");
const { subject_email } = require("../config/values");
const validasiLogin = require("../utils/validasiLogin");
const { generateApikey } = require("../utils/values");

const createAccountLimiter = expressLimit({
	windowMs: 60 * 60 * 1000, // 1 hour window
	max: 4, // start blocking after 5 requests
	handler: function (req, res, next) {
		next(new ErrorResponse(`Too many request form this IP`, 429));
	},
});
router.get("/verify/:id", async (req, res, next) => {
	let id = req.params.id;
	try {
		const decoded = jwt.verify(id, process.env.JWT_VERIFY);
		let data = {
			email: decoded.email,
			username: decoded.username,
			nomor_whatsapp: decoded.nomor_whatsapp,
			password: decoded.password,
			apikey: decoded.apikey,
			limit: decoded.limit,
			type: decoded.type,
			role: decoded.role,
			isVerif: true,
		};
		console.log(decoded);
		let cek = await cekUser(data);
		console.log(cek);
		if (cek == null) {
			await tambahUser(data);
			responseMessage(res, 200, "Succsess Verify");
		} else {
			next(new ErrorResponse("User already verify", 401));
			return false;
		}
		//   if (cek == null) {
		//     responseMessage(res, 200, "Success Verify");
		//     return false;
		//   } else {
		//     return false;
		//   }
	} catch (err) {
		console.log(err);
		next(new ErrorResponse("Invalid token", 401));
	}
});

router.post(
	"/register",
	createAccountLimiter,
	expressCsrf({ cookie: true }),
	async (req, res, next) => {
		let data = await validasi(req.body, subject_email, next);

		if (data.status && data.status != 200) {
			next(new ErrorResponse(data.message, data.status));
			return false;
		}
		req.session.isLogged = false;
		req.session.dataUser = data;
		responseMessage(
			res,
			200,
			"Successfully registered. Please check your email to verified account!"
		);
	}
);

router.get("/register", expressCsrf({ cookie: true }), async (req, res, next) => {
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

router.post("/login", expressCsrf({ cookie: true }), async (req, res, next) => {
	try {
		let validasi = await validasiLogin(req.body, req, res, next);
		if (validasi.status && validasi.status != 200) {
			next(new ErrorResponse(validasi.message, validasi.status));
			return false;
		}
		responseMessage(res, 200, "Succses login");
	} catch (e) {
		console.log(e);
		next(new ErrorResponse("internal server errror", 500));
	}
});
router.get("/login", expressCsrf({ cookie: true }), async (req, res, next) => {
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

router.get("/logout", async (req, res, next) => {
	req.session.destroy(function (err) {
		res.redirect("../../");
	});
});

module.exports = router;

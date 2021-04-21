const nodemailer = require("nodemailer");
const config = require("./values");

exports.mail = nodemailer.createTransport({
  service: config.service,
  auth: {
    user: config.umail,
    pass: config.upass,
  },
});

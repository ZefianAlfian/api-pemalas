

const nodemailer = require("nodemailer");

let mail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreplyzrapi@gmail.com",
    pass: "Zefian098",
  },
});
let mailOptions = {
  from: "noreplyzrapi@gmail.com",
  to: "cukimaycyberteam@gmail.com",
  subject: "WOI",
  html: html,
};

mail.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
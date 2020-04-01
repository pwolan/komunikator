require("dotenv").config();
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "drinkittogether@gmail.com",
    pass: process.env.MAIL_PASSWORD
  }
});
module.exports = transporter
const transporter = require("./config.js");
const { getMailOptions } = require("./verify");

function sendMail(username, mail, verify) {
  let mailOptions = getMailOptions(username, mail, verify);
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendMail };

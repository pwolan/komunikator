const User = require("../model/user");
const { checkLogin, checkRegister, validation } = require("../middlewares/validation");
const { loginFields, registerFields } = require("../helpers/authFields");
const { sendMail } = require("../helpers/mails/sender.js");

module.exports = {
  renderLogin(req, res) {
    res.render("login", { fields: loginFields });
  },
  submitLogin: [
    checkLogin,
    async (req, res) => {
      //validation
      const { succes, fields } = validation(req, loginFields);
      if (!succes) {
        return res.render("login", { fields });
      }
      const { username, password } = req.body;
      User.login(username, password, (succes, user) => {
        if (succes) {
          //save user in session
          req.session.user = user;
          res.redirect("/user");
        } else {
          res.render("login", { fields });
        }
      });
    }
  ],
  renderRegister(req, res) {
    res.render("register", { fields: registerFields });
  },
  submitRegister: [
    checkRegister,
    async (req, res) => {
      //validation
      const { succes, fields } = validation(req, registerFields);
      if (!succes) {
        return res.render("register", { fields });
      }
      let data = req.body;
      let verify = await User.register(data);
      sendMail(data.username, data.mail, verify);

      res.render("confirmAccount");
    }
  ],
  logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        backURL = req.header("Referer") || "/";
        res.redirect(backURL);
      } else {
        res.clearCookie();
        res.redirect("/login");
      }
    });
  }
};

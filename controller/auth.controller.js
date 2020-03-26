const User = require("../model/user");
const { checkLogin, checkRegister, validation } = require("../middlewares/validation");
const { validationResult } = require("express-validator");
const { loginFields, registerFields } = require("../helpers/authFields");

module.exports = {
  renderLogin(req, res) {
    res.render("login", { fields: loginFields });
  },
  submitLogin: [
    checkLogin,
    (req, res) => {
      //validation
      const { succes, fields } = validation(req, loginFields);
      if (!succes) {
        return res.render("login", { fields });
      }

      const { username, password } = req.body;
      console.log(req.body);
      User.login(username, password);
      res.end();
    }
  ],
  renderRegister(req, res) {
    res.render("register", { fields: registerFields });
  },
  submitRegister: [
    checkRegister,
    (req, res) => {
      //validation
      const { succes, fields } = validation(req, registerFields);
      if (!succes) {
        return res.render("register", { fields });
      }
      let data = req.body;
      User.register(data);
      res.redirect("/");
    }
  ],
  logout(req, res) {}
};

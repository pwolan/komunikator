const User = require("../model/user");
const { checkLogin, checkRegister } = require("../middlewares/validation");
const { validationResult } = require("express-validator");

module.exports = {
  renderLogin(req, res) {
    res.render("login");
  },
  submitLogin: [
    checkLogin,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { username, password } = req.body;
      console.log(req.body);
      User.login(username, password);
      res.end();
    }
  ],
  renderRegister(req, res) {
    res.render("register");
  },
  submitRegister: [checkRegister,(req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let data = req.body;
    // User.register(data);
    res.redirect("/");
  }],
  logout(req, res) {}
};

const User = require("../model/user");
const { checkLogin, checkRegister, validation } = require("../middlewares/validation");
const { loginFields, registerFields } = require("../helpers/authFields");

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
        console.log(succes);
        if (succes) {
          //save user in session
          console.log(user);
          req.session.user = user;
          res.redirect("/user");
        } else {
          let errorStatus = "Invalid login or password";
          res.render("login", { fields, errorStatus });
        }
      });
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
      res.redirect("/login");
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

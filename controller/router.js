const express = require("express");
const router = express.Router();
const auth = require("./auth.controller");
const path = require("path");
const { redirectLogin, redirectHome } = require("../middlewares/auth");
require("dotenv").config();

module.exports = function (io) {
  //views
  router.get("/", (req, res) => {
    res.render("index");
  });
  router.get("/confirm", (req, res) => {
    res.render("confirmAccount");
  });
  //authentication
  router.route("/login").all(redirectHome).get(auth.renderLogin).post(auth.submitLogin);
  router.route("/register").all(redirectHome).get(auth.renderRegister).post(auth.submitRegister);
  router.get("/logout", redirectLogin, auth.logout);

  //api
  router.use("/friends", redirectLogin, require("./friends.controller")(io));
  router.use("/chat", redirectLogin, require("./chat.controller")(io));
  router.use("/account", redirectLogin, require("./account.controller"));

  router.get("/user*", redirectLogin, (req, res) => {
    //user react app
    let isDevelopment;
    if (process.env.NODE_ENV) {
      isDevelopment = process.env.NODE_ENV.trim() == "development";
    } else {
      isDevelopment = false;
    }
    if (!isDevelopment) {
      res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    } else {
      res.redirect("http://localhost:5000/user");
    }
  });
  return router;
};

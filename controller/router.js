const express = require("express");
const router = express.Router();
const auth = require("./auth.controller");
const path = require("path");
const { redirectLogin, redirectHome } = require("../middlewares/auth");
const { loginFields, registerFields } = require("../helpers/authFields");
require("dotenv").config();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/test", (req, res) => {
  res.render("testMsg");
});
router.get("/confirm", (req, res) => {
  res.render("confirmAccount");
});
//authentication
router.route("/login").all(redirectHome).get(auth.renderLogin).post(auth.submitLogin);

router.route("/register").all(redirectHome).get(auth.renderRegister).post(auth.submitRegister);

router.get("/logout", redirectLogin, auth.logout);

//user
// router.use("/user", redirectLogin, require("./user.controller"));
//friends
router.use("/friends", redirectLogin, require("./friends.controller"));
//chats
router.use("/chat", redirectLogin, require("./chat.controller").Router);

//api
router.use("/api", require("./api.controller"));

// router.get("/olduser", (req, res) => {
//   res.render("user");
// });

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
module.exports = router;

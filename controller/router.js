const express = require("express");
const router = express.Router();
const auth = require("./auth.controller");
const { redirectLogin, redirectHome } = require("../middlewares/auth");

router.get("/", redirectLogin, (req, res) => {
  res.render("index.pug");
});

//authentication
router
  .route("/login", redirectHome)
  .get(auth.renderLogin)
  .post(auth.submitLogin);

router
  .route("/register", redirectHome)
  .get(auth.renderRegister)
  .post(auth.submitRegister);

router.get("/logout", redirectHome, auth.logout);

//user
router.use("/user", redirectLogin, require("./user.controller"));
module.exports = router;

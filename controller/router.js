const express = require("express");
const router = express.Router();
const auth = require("./auth.controller");
const { redirectLogin, redirectHome } = require("../middlewares/auth");
const { loginFields, registerFields } = require("../helpers/authFields");

router.get("/", (req, res) => {
  res.render("index.pug", { loginFields, registerFields });
});

//authentication
router
  .route("/login")
  .all(redirectHome)
  .get(auth.renderLogin)
  .post(auth.submitLogin);

router
  .route("/register")
  .all(redirectHome)
  .get(auth.renderRegister)
  .post(auth.submitRegister);

router.get("/logout", redirectLogin, auth.logout);

//user
router.use("/user", redirectLogin, require("./user.controller"));
module.exports = router;

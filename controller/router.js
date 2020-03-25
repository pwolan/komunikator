const express = require("express");
const router = express.Router();
const auth = require("./auth.controller");

router.get("/", (req, res) => {
  res.end("Start");
});

//authentication
router
  .route("/login")
  .get(auth.renderLogin)
  .post(auth.submitLogin);

router
  .route("/register")
  .get(auth.renderRegister)
  .post(auth.submitRegister);

router.get("/logout", auth.logout);
module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("./auth.controller");
const { redirectLogin } = require("../middlewares/auth");

router.get("/", (req, res) => {
  let username = req.session.user.username;
  res.render("user.pug", { username });
});

module.exports = router;

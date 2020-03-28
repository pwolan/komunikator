const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let username = req.session.user.username;
  res.render("user.pug", { username });
});

module.exports = router;

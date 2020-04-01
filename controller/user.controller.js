const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let username = req.session.user.username;
  let { id } = req.session.user;

  res.render("user.pug", { username, id });
});


module.exports = router;

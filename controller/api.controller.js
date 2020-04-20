const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let { username } = req.session.user;
  res.json({ username });
});

module.exports = router;

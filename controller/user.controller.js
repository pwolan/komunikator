const express = require("express");
const router = express.Router();
const Friend = require("../model/friend");

router.get("/", async (req, res) => {
  let { username, idusers } = req.session.user;
  let friends = await Friend.view(idusers);
  console.log(friends);
  res.render("user.pug", { username, id: idusers, friends });
});

module.exports = router;

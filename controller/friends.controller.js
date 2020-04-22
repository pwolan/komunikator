const express = require("express");
const router = express.Router();
const Friend = require("../model/friend");
const User = require("../model/user");

router.get("/currentUser", (req, res) => {
  const { user } = req.session;
  res.json(user);
});
router.get("/userStats/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.get(id);
  console.log(user);
  res.json({
    user,
  });
});
router.post("/searchFriend", async (req, res) => {
  const { text } = req.body;
  console.log(req.body);
  let { idusers } = req.session.user;
  const users = await Friend.find(text, idusers);
  console.log(users);
  res.json({
    users,
  });
});

router.post("/addFriend", async (req, res) => {
  const { friendId } = req.body;
  let { idusers } = req.session.user;
  let succes = await Friend.add(idusers, parseInt(friendId));
  res.json({
    succes,
  });
});

router.get("/declineFriend/:friend", async (req, res) => {
  const { friend } = req.params;
  let userId = req.session.user.idusers;
  let succes = await Friend.remove(userId, friend);
  res.json({ succes });
});

router.get("/acceptFriend/:friend", async (req, res) => {
  const { friend } = req.params;
  let userId = req.session.user.idusers;
  let succes = await Friend.accept(userId, friend);
  res.json({
    succes,
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Friend = require("../model/friend");

router.get("/currentUser", (req, res) => {
  const { user } = req.session;
  res.json(user);
});

router.post("/searchFriend", async (req, res) => {
  const { text, userId } = req.body;
  console.log(req.body);
  const users = await Friend.find(text, userId);
  console.log(users);
  res.json({
    users,
  });
});

router.post("/addFriend", async (req, res) => {
  const { newFriendId, userId } = req.body;
  // console.log(parseInt(newFriendId));
  let succes = await Friend.add(userId, parseInt(newFriendId));
  console.log(succes);
  res.json({
    succes,
  });
});

router.get("/declineFriend/:userId", async (req, res) => {
  const { userId } = req.params;
  const { friend } = req.query;
  let succes = await Friend.remove(userId, friend);
  res.json({ succes });
});

module.exports = router;

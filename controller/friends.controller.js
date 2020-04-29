const express = require("express");
const router = express.Router();
const Friend = require("../model/friend");
const Chat = require("../model/chat");

router.get("/online", async (req, res) => {
  const { idusers } = req.session.user;
  const data = await Friend.view(idusers);
  res.json(data);
});

router.get("/search/:text", async (req, res) => {
  const { text } = req.params;
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

router.delete("/declineFriend/:friendId", async (req, res) => {
  const { friendId } = req.params;
  let userId = req.session.user.idusers;
  let succes = await Friend.remove(userId, friendId);
  res.json({ succes });
});

router.put("/acceptFriend/:friendId", async (req, res) => {
  const { friendId } = req.params;
  let userId = req.session.user.idusers;
  let succes = await Friend.accept(userId, friendId);
  Chat.create([userId, friendId]);
  res.json({
    succes,
  });
});

module.exports = router;

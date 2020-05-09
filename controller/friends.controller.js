const express = require("express");
const router = express.Router();
const Friend = require("../model/friend");
const Chat = require("../model/chat");

module.exports = function (io) {
  io.of("/friends").on("connection", (socket) => {
    const { user } = socket.handshake.session;
    if (user) socket.join(user.idusers);

    router.post("/addFriend", async (req, res) => {
      const { friendId } = req.body;
      let { idusers } = req.session.user;
      let succes = await Friend.add(idusers, parseInt(friendId));
      if (succes) {
        console.log("SENDING INVITE SRV");
        let [toSend] = await Friend.viewOne(idusers, friendId);
        console.log(toSend);
        console.log("FRINEDID", friendId);
        io.of("/friends").to(friendId).emit("invite", toSend);
      }
      res.json({
        succes,
      });
    });
    router.put("/acceptFriend/:friendId", async (req, res) => {
      const { friendId } = req.params;
      let userId = req.session.user.idusers;
      let succes = await Friend.accept(userId, friendId);
      if (succes) {
        console.log("SENDING INVITESTATUS CHANGE");
        io.of("/friends").to(friendId).emit("statuschange", { idusers: userId, inviteStatus: 1 });
      }
      Chat.create([userId, friendId]);
      res.json({
        succes,
      });
    });
  });

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

  router.delete("/declineFriend/:friendId", async (req, res) => {
    const { friendId } = req.params;
    console.log(req.params);
    let userId = req.session.user.idusers;
    console.log("DECLINE");
    let succes = await Friend.remove(userId, friendId);
    res.json({ succes });
  });

  return router;
};

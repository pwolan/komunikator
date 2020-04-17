const Chat = require("../model/chat");
const router = require("express").Router();

exports.initSocket = (io) => {
  console.log("Connected!");
  io.on("connection", (socket) => {
    let { session } = socket.handshake;
    socket.on("adduser", (username, id) => {
      // socket.username = username;
    });
    socket.on("changeroom", async (roomId) => {
      console.log(roomId, socket.handshake.session.user.room);
      // if (roomId != socket.handshake.session.user.room) {
      socket.leave(socket.handshake.session.user.room);
      socket.handshake.session.user.room = roomId;
      socket.handshake.session.save();
      socket.join(roomId);

      let data = await Chat.view(roomId, 0);
      // console.log(data);
      socket.emit("changeroom", data);
      // }
    });
    socket.on("sendmessage", async (msg) => {
      let { idusers, username, room } = session.user;
      try {
        await Chat.send(room, idusers, msg);
        io.to(room).emit("updatechat", { idusers, username }, msg);
      } catch (err) {
        console.log(err);
        socket.emit("updatechat", { idusers, username }, "Failed to write message!");
      }
    });
  });
};
router.get("/messages/:number", async (req, res) => {
  const { user } = req.session;
  let { number } = req.params;
  console.log(user.room);
  console.log(number);
  let data = await Chat.view(user.room, number);
  res.json(data);
});

exports.Router = router;

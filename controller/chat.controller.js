const Chat = require("../model/chat");
const router = require("express").Router();

exports.initSocket = (io) => {
  console.log("Connected!");
  io.on("connection", (socket) => {
    socket.emit("test", { d: "testdata" });
    let { session } = socket.handshake;
    // socket.on("adduser", (username, id) => {
    //   // socket.username = username;
    // });
    socket.on("changeroom", async (friendId) => {
      let { idusers } = session.user;
      roomId = idusers < friendId ? `${idusers}#${friendId}` : `${friendId}#${idusers}`;
      socket.leave(session.user.room);
      socket.handshake.session.user.room = roomId;
      socket.handshake.session.save();
      socket.join(roomId);

      let data = await Chat.view(roomId, 0);
      socket.emit("changeroom", data);
    });
    socket.on("sendmessage", async (msg) => {
      let { idusers, username, room } = session.user;
      try {
        await Chat.send(room, idusers, msg);
        io.to(room).emit("updatechat", idusers, msg);
      } catch (err) {
        // console.log(err);
        // socket.emit("updatechat", { idusers, username }, "Failed to write message!");
        console.log('updatechat');
        socket.emit("updatechat", "aaa")
      }
    });
  });
};
router.get("/messages/:number", async (req, res) => {
  const { user } = req.session;
  let { number } = req.params;
  let data = await Chat.view(user.room, number);
  res.json(data);
});

exports.Router = router;

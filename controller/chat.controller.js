const Chat = require("../model/chat");
const Friend = require("../model/friend");
const router = require("express").Router();

module.exports = (io) => {
  console.log("Connected!");
  io.on("connection", (socket) => {
    socket.emit("test", { d: "testdata" });
    let { session } = socket.handshake;
    socket.on("changeroom", async (roomId) => {
      console.log("CHANGE_ROOM");
      socket.leave(session.user.room);
      socket.handshake.session.user.room = roomId;
      socket.handshake.session.save();
      socket.join(roomId);

      console.log(roomId);

      // let data = await Chat.view(roomId, 0);

      socket.emit("changeroom", "Room changed");
    });
    socket.on("test", () => {
      console.log("TEST");
      socket.emit("test", "XDD");
    });
    socket.on("sendmessage", async (msg) => {
      console.log("SEND_MESSAGE");
      let { idusers, username, room } = session.user;
      try {
        let [message] = await Chat.send(room, idusers, msg);
        io.to(room).emit("updatechat", message);
      } catch (err) {
        console.log(err);
        socket.emit("updatechat", { idusers, username }, "Failed to write message!");
      }
    });
  });
  router.get("/room/:roomId", (req, res) => {
    //TODO
  });
  router.get("/messages/:number", async (req, res) => {
    const { user } = req.session;
    let { number } = req.params;
    console.log(number);
    let data = await Chat.view(user.room, number);
    res.json(data);
  });

  return router;
};

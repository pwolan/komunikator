const Chat = require("../model/chat");
const Friend = require("../model/friend");
const router = require("express").Router();

module.exports = (io) => {
  io.of("/chat").on("connection", (socket) => {
    let { session } = socket.handshake;
    /**
     * changing room when render ChatRoom
     * always run before the others
     * @param roomId {number} - id of room to join
     */
    socket.on("changeroom", (roomId) => {
      socket.leave(session.user.room);
      socket.handshake.session.user.room = roomId;
      socket.handshake.session.save();
      socket.join(roomId);
      socket.emit("changeroom succes");
      console.log(socket.handshake.session.user.room);
    });
    /**
     * message sending handler
     * works only if server was not reloaded after client connection
     * @param msg {String} - message to send everyone in room
     */
    socket.on("sendmessage", async (msg) => {
      let { idusers, username, room } = session.user;
      try {
        let [message] = await Chat.send(room, idusers, msg);
        io.of("/chat").to(room).emit("updatechat", message);
      } catch (err) {
        console.log(err);
        socket.emit("sendmessage error", { idusers, username }, "Failed to write message!");
      }
    });
    // /**
    //  * returns user max 30 messages from current room
    //  * @param number {Number} - number of already fetched messages
    //  */
    // socket.on("fetchmessage", async (number) => {
    //   let { room } = socket.handshake.session.user;
    //   console.log("room", room);
    //   let data = await Chat.view(room, number);
    //   if (data) {
    //     socket.emit("fetchmessages", data);
    //   } else {
    //   }
    // });
  });
  router.get("/room/:roomId", (req, res) => {
    //TODO
  });

  /**
   * fetching messages to chatroom
   * @param number {Number} - number of already fetched messages
   */
  router.get("/messages/:number", async (req, res) => {
    const { user } = req.session;
    let { number } = req.params;
    if (!number) {
      res.sendStatus(400);
    }
    try {
      let data = await Chat.view(user.room, number);
      res.status(200).json(data);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  router.get("/room/stats/:roomId", async (req, res) => {
    const { idusers } = req.session.user;
    const { roomId } = req.params;
    let data = await Chat.stats(roomId, idusers);
    res.json(data);
  });

  return router;
};

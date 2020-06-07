const Chat = require("../model/chat");
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
        let data = await Chat.getUsers(room);
        console.log(data);
        for (let { idusers } of data) {
          // like last message one
          let toSend = await Chat.getChat(idusers, room);
          console.log(toSend);
          // console.log(idusers, message);
          io.of("/chats").to(idusers).emit("lastmessageschange", toSend);
        }
      } catch (err) {
        console.log(err);
        socket.emit("sendmessage error", { idusers, username }, "Failed to write message!");
      }
    });
  });

  io.of("/chats").on("connection", (socket) => {
    socket.on("changeroom", () => {
      console.log(socket.handshake.session.user.idusers);
      socket.join(socket.handshake.session.user.idusers);
    });
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
    console.log("TEst:", idusers, roomId);
    let data = await Chat.stats(roomId, idusers);
    res.json(data);
  });

  /**
   * fetching last chats
   * for Chats component
   * @param number {Number} - number of already fetched last messages/Friends
   */
  router.get("/last/:number", async (req, res) => {
    const { number } = req.params;
    const { idusers } = req.session.user;
    let data = await Chat.last(idusers, number);
    if (data) {
      res.status(200).json(data);
    } else {
      res.sendStatus(500);
    }
  });
  return router;
};

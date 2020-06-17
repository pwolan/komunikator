const Chat = require("../model/chat");
const router = require("express").Router();

module.exports = (io) => {
  const chatnsp = io.of("/chat");
  const chatsnsp = io.of("/chats");
  chatnsp.on("connection", (socket) => {
    let { session } = socket.handshake;
    /**
     * changing room when render ChatRoom
     * always run before the others
     * @param roomId {number} - id of room to join
     */
    socket.on("changeroom", async (roomId) => {
      socket.leave(session.user.room);
      socket.handshake.session.user.room = roomId;
      socket.handshake.session.save();
      socket.join(roomId);

      // change read status to readed
      let { idusers } = session.user;
      await Chat.readed(roomId, idusers);
      let [message] = await Chat.getChat(idusers, roomId);
      io.of("/chats").to(idusers).emit("lastmessageschange", message);
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
        for (let { idusers } of data) {
          let toSend = await Chat.getChat(idusers, room);
          console.log(toSend);
          io.of("/chats").to(idusers).emit("lastmessageschange", toSend);
        }
      } catch (err) {
        console.log(err);
        socket.emit(
          "sendmessage error",
          { idusers, username },
          "Failed to write message!"
        );
      }
    });
  });

  chatsnsp.on("connection", (socket) => {
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

  /**
   * fetching room stats like to header
   */
  router.get("/room/stats/:roomId", async (req, res) => {
    const { idusers } = req.session.user;
    const { roomId } = req.params;
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

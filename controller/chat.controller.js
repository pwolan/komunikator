exports.initSocket = (io) => {
  console.log("Connected!");
  io.on("connection", (socket) => {
    socket.on("adduser", (username) => {
      socket.username = username;
    });
    socket.on("changeroom", (roomId) => {
      socket.leave(socket.room);
      socket.room = roomId;
      socket.join(roomId);
    });
    socket.on("sendmessage", (msg) => {
      console.log(msg);
      console.log(socket.room);
      // console.log(send);
      io.to(socket.room).emit("updatechat", socket.username, msg);
    });
  });
};

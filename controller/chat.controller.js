exports.initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Conected!");
    console.log(socket.id);
    socket.on("11", (msg, d) => {
      console.log(d);
      io.emit("11", msg);
      console.log(msg);
    });
  });
};

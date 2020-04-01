$(() => {
  let socket = io();
  console.log(socket);
  socket.emit("chat message", "Lubie placki");
});

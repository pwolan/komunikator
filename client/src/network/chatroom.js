import socketIO from "socket.io-client";
import axios from "axios";

const socket = socketIO.connect();
export const test = () => {
  console.log("klik");
  socket.emit("test");
};
export const getRoomData = async (friendId) => {
  //TODO
  let { data } = await axios.get(`/account/stats/${friendId}`);
  return data;
};
export const fetchMessages = async (number) => {
  console.log("NUMBER", number);
  let { data } = await axios.get(`/chat/messages/${number}`);
  return data;
};

export const changeRoom = async (roomId) => {
  console.log(roomId);
  socket.emit("changeroom", roomId);
};

export const subscribeRoom = async (callback) => {
  socket.on("updatechat", callback);
};
export const unSubscribeRoom = async () => {
  socket.off("updatechat");
};
export const sendMessage = async (msg) => {
  socket.emit("sendmessage", msg);
};

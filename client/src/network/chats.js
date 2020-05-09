import SocketIO from "socket.io-client";
import axios from "axios";

const socket = SocketIO.connect("/chats");

export const fetchChats = async (number) => {
  try {
  } catch (err) {
    console.error(err);
    return null;
  }
};

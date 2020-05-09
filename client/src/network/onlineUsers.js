import SocketIO from "socket.io-client";
import axios from "axios";

const socket = SocketIO.connect("//localhost:3000/friends");

export const subscribe = (clb1, clb2) => {
  socket.on("invite", clb1);
  socket.on("statuschange", clb2);
};

export const unsubscribe = () => {
  socket.off("invite");
  socket.off("statuschange");
};

export const fetchOnlineUsers = async () => {
  try {
    let { data } = await axios.get("/friends/online");
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const inviteUser = async (id) => {
  try {
    let res = await axios.post("/friends/addFriend", { friendId: id });
    return res.data.succes;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const acceptFriend = async (id) => {
  try {
    let { data } = await axios.put(`/friends/acceptFriend/${id}`);
    return data.succes;
  } catch (err) {
    console.error(err);
    return false;
  }
};
export const declineFriend = async (id) => {
  try {
    let { data } = await axios.delete(`/friends/declineFriend/${id}`);
    return data.succes;
  } catch (err) {
    console.error(err);
    return false;
  }
};

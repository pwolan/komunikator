import socketIO from "socket.io-client";
import axios from "axios";

const socket = socketIO.connect("/chat");

export const changeRoom = async (roomId, next) => {
  socket.emit("changeroom", roomId);
  socket.on("changeroom succes", () => {
    console.log("changeroom succes!");
    socket.off("changeroom succes");
    next();
  });
};

//#region roomData
export const getRoomData = async (roomId) => {
  let { data } = await axios.get(`/chat/room/stats/${roomId}`);
  return data[0];
};

//#region Messages
let fetchCancelToken = axios.CancelToken.source();
let fetchTimeoutToken;
export const fetchMessages = async (number) => {
  try {
    let { data } = await axios.get(`/chat/messages/${number}`, {
      cancelToken: fetchCancelToken.token,
    });
    console.log(data);
    return data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Cancelled ");
      return [];
    }
    console.error("Cannot connect to the server, reconnectiong...");
    //TODO better error handling
    fetchTimeoutToken = setTimeout(fetchMessages.bind(this, number), 3000);
    return fetchTimeoutToken;
  }
};

export const cancelFetch = async () => {
  if (fetchTimeoutToken) clearTimeout(fetchTimeoutToken);
  fetchCancelToken.cancel();
  fetchCancelToken = axios.CancelToken.source();
};
// export const fetchMessages = async (number) => {
//   socket.emit("fetchmessages", number);
// };
//#region subscribtion

export const subscribeRoom = (callback) => {
  console.log("Subscribed");
  socket.on("updatechat", callback);
  socket.on("sendmessage error", () => {
    console.error("Failed to write a message!");
  });
};
export const unSubscribeRoom = () => {
  console.log("Unsub");
  socket.off("updatechat");
  socket.off("sendmessage error");
};

//#region sendMessage
export const sendMessage = async (msg) => {
  // console.log(msg);
  socket.emit("sendmessage", msg);
};

//#region changeRoom
// let changeRoomCancel = axios.CancelToken.source();
// export const changeRoom = async (roomId) => {
//   console.log(socket.connected);
//   try {
//     let { data } = await axios.get(`/chat/changeRoom/${roomId}`, {
//       cancelToken: changeRoomCancel.token,
//     });
//     console.log(data);
//   } catch (err) {
//     if (axios.isCancel(err)) {
//       console.log("cancel");
//       return;
//     }
//     console.error("Changing failed, reconnecting...");
//     return setTimeout(changeRoom.bind(this, roomId), 500);
//   }
// };
// export const cancelChangeRoom = async () => {
//   changeRoomCancel.cancel("Leaving");
//   changeRoomCancel = axios.CancelToken.source();
// };

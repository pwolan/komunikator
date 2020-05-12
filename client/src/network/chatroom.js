import socketIO from "socket.io-client";
import axios from "axios";

const socket = socketIO.connect("/chat");

export const changeRoom = async (roomId, next) => {
  enableFetchMessages();
  socket.emit("changeroom", roomId);
  socket.on("changeroom succes", () => {
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
let isFetchMessageEnabled = true;
export const fetchMessages = async (number) => {
  if (!isFetchMessageEnabled) return null;
  try {
    let { data } = await axios.get(`/chat/messages/${number}`, {
      cancelToken: fetchCancelToken.token,
    });
    return data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Cancelled ");
      return null;
    }
    console.error("Cannot connect to the server, reconnectiong...");
    fetchTimeoutToken = setTimeout(fetchMessages.bind(this, number), 3000);
    return fetchTimeoutToken;
  }
};

function enableFetchMessages() {
  isFetchMessageEnabled = true;
}
export const disableFetchMessages = () => {
  isFetchMessageEnabled = false;
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
  socket.on("updatechat", callback);
  socket.on("sendmessage error", () => {
    console.error("Failed to write a message!");
  });
};
export const unSubscribeRoom = () => {
  socket.off("updatechat");
  socket.off("sendmessage error");
};

export const sendMessage = async (msg) => {
  socket.emit("sendmessage", msg);
};

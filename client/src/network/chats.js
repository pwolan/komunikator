import SocketIO from "socket.io-client";
import axios from "axios";

const socket = SocketIO.connect("/chats");

let fetchCancelToken = axios.CancelToken.source();
let fetchTimeoutToken;
let isFetchChatEnabled = true;
export const fetchChats = async (number) => {
  if (!isFetchChatEnabled) return null;
  // console.log(number);
  try {
    let { data } = await axios.get(`/chat/last/${number}`, {
      cancelToken: fetchCancelToken.token,
    });
    // console.log(data);
    return data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Cancelled");
      return null;
    }
    console.error("Cannot connect to the server, reconnecting...");
    fetchTimeoutToken = setTimeout(fetchChats.bind(this, number), 1000);
    return fetchTimeoutToken;
  }
};

export const enableFetchChats = () => {
  isFetchChatEnabled = true;
};
export const disableFetchChats = () => {
  isFetchChatEnabled = false;
};

//#real time support
export const subscribeLast = (callback) => {
  socket.emit("changeroom");
  socket.on("lastmessageschange", callback);
};
export const unsubscribeLast = () => {
  socket.off("lastmessageschange");
};

import axios from "axios";

export const INCREMENT = "INCREMENT";
export const CHATS_FETCH = "CHATS_FETCH";
export const ONLINE_FETCH_SUCCES = "ONLINE_FETCH_SUCCES";
export const ONLINE_FETCH_FAILURE = "ONLINE_FETCH_FAILURE";
export const CHATROOM_ID_SET = "CHATROOM_ID_SET";
export const CHATROOM_FETCH = "CHATROOM_FETCH";
export const CHATROOM_FETCH_SUCCES = "CHATROOM_FETCH_SUCCES";
export const CHATROOM_FETCH_FAILURE = "CHATROOM_FETCH_FAILURE";

export const addOne = (itemType) => (dispatch) => {
  console.log("add one!");
  dispatch({ type: INCREMENT });
};

export const fetchChats = () => (dispatch) => {
  // /chat.onlineusers
};

export const fetchOnlineUsers = () => (dispatch) => {
  return axios
    .get("/friends/online")
    .then(({ data }) => {
      dispatch({
        type: ONLINE_FETCH_SUCCES,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ONLINE_FETCH_FAILURE });
    });
};

export const setChatroomId = (chatroomId) => ({
  type: CHATROOM_ID_SET,
  payload: { chatroomId },
});

export const fetchChatroomMessages = () => (dispatch) => {
  // return axios
};

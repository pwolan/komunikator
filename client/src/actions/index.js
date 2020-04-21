import axios from "axios";

export const INCREMENT = "INCREMENT";
export const CHATS_FETCH = "CHATS_FETCH";
export const ONLINE_FETCH_SUCCES = "ONLINE_FETCH_SUCCES";
export const ONLINE_FETCH_FAILURE = "ONLINE_FETCH_FAILURE";

export const addOne = (itemType) => (dispatch) => {
  console.log("add one!");
  dispatch({ type: INCREMENT });
};

export const fetchChats = () => (dispatch) => {
  // /chat.onlineusers
};

export const fetchOnlineUsers = () => (dispatch) => {
  return axios
    .get("/chat/onlineusers")
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

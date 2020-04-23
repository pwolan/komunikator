import { INCREMENT, ONLINE_FETCH_SUCCES, CHATROOM_ID_SET } from "actions";

const initialState = {
  onlineUsers: [],

  //chatRoom
  messages: [],
  messagesCount: 0,
  roomId: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ONLINE_FETCH_SUCCES:
      return {
        ...state,
        onlineUsers: [...action.payload.data],
      };
    case CHATROOM_ID_SET:
      return {
        ...state,
        roomId: action.payload.chatroomId,
      };
    default:
      break;
  }
  return state;
};

export default rootReducer;

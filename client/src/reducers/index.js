import { INCREMENT, ONLINE_FETCH_SUCCES } from "actions";

const initialState = {
  onlineUsers: [],

  //chatRoom
  messages: [],
  messagesCount: 0,
  roomId: null,

  counter: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: ++state.counter,
      };
    case ONLINE_FETCH_SUCCES:
      return {
        ...state,
        onlineUsers: [...action.payload.data],
      };
    default:
      break;
  }
  return state;
};

export default rootReducer;

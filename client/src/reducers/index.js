import { INCREMENT } from "actions";

const initialState = {
  counter: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: ++state.counter,
      };
    default:
      break;
  }
  return state;
};

export default rootReducer;

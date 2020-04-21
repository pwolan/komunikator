import axios from "axios";

export const INCREMENT = "INCREMENT";

export const addOne = (itemType) => (dispatch) => {
  console.log("add one!");
  dispatch({ type: INCREMENT });
};

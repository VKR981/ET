import { CREATE_MESSAGE, GET_ERRORS, CLEAR_MESSAGE } from "../actions/types";

const initialState = "";

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    case GET_ERRORS:
      return (state = action.payload);
    case CLEAR_MESSAGE:
      return "";
    default:
      return state;
  }
}

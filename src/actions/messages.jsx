import { CREATE_MESSAGE, GET_ERRORS, CLEAR_MESSAGE } from "./types";

// CREATE MESSAGE
export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

// RETURN ERRORS
export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};

export const clearmessage = (msg, status) => {
  return {
    type: CLEAR_MESSAGE,
    payload: { msg, status },
  };
};
